from flask import Blueprint, jsonify, request
import math

from ..models import Event, db, User
from .helperFunctions import unpack_category, unpack_choice_from_predictions, unpack_predictions, unpack_users_from_comments, unpack_users_from_predictions
from ..forms.event_creation_form import CreateEventForm

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
def get_all_events():
    print('hit route get_all_Events')
    events = Event.query.all()
    data = [event.to_dict_main_app() for event in events]
    data = unpack_predictions(data)
    data = unpack_category(data)
    # print('---------------')
    # print(data)
    # print('----------------')
    return jsonify(data)


@event_routes.route('/<id>')
def get_event(id):
    event = Event.query.get(id)
    data = event.to_dict_full()
    data['category'] = data['category'].to_dict()
    data['predictions'] = [prediction.to_dict_event() for prediction in data['predictions']]
    data['comments'] = [comment.to_dict_event() for comment in data['comments']]
    data['comments'] = unpack_users_from_comments(data['comments'])
    data['predictions'] = unpack_choice_from_predictions(data['predictions'])
    data['predictions'] = unpack_users_from_predictions(data['predictions'])
    # print('-----------')
    # print(data)
    # print('-----------')
    
    return jsonify(data)
    


@event_routes.route('/', methods=['POST'])
def create_event():
    # form = CreateEventForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    print('----------')
    print('hit form validation')
    print('----------')
    new_event = Event()

    new_event.title = request.get_json().get('title')
    new_event.description = request.get_json().get('description')
    new_event.expires = request.get_json().get('expires')
    new_event.category_id = request.get_json().get('category_id')
    print('--------')
    print(new_event)
    print('--------')
    db.session.add(new_event)
    db.session.commit()
    print('--------')
    print('commited')
    print('--------')

    return {'id':new_event.id}

    # print('hit error')
    # return {'errors': validation_errors_to_error_messages(form.errors)}

@event_routes.route('/resolve', methods=['PUT'])
def resolve_events():
    # print('------')
    # print('hit route')
    # print('------')
    event_ids = request.get_json().get('event_ids')
    for current_id in event_ids:
        event = Event.query.get(current_id)
        if (event.resolved == False):
            event.resolved = True 
            db.session.commit()
    # print('------')
    # print('went through update cycle')
    # print('------')

    #return_all_events determines whether all events should be sent back, or just a single one
    return_all_events = request.get_json().get('return_all_events')
    if (return_all_events):
        # print('------')
        # print('hit return_all events')
        # print('------')
        data = get_all_events()
        # print('------')
        # print(data)
        # print('------')
        return data
    else:
        data = get_event(event_ids[0])
        return data

@event_routes.route('/<event_id>/score/<choice_id>', methods=['POST'])
def handle_scores(event_id, choice_id):

    event = Event.query.get(event_id)

    chosen_predictions = [prediction for prediction in event.predictions if prediction.choice_id == choice_id]

    score_dict = {}

    for prediction in chosen_predictions:
        score = None
        if chosen_predictions.index(prediction) == 0:
            score = scoring_function(prediction.probability, 50)
        else:
            previous_index = chosen_predictions.index(prediction) - 1
            previous_prediction = chosen_predictions[previous_index]
            score = scoring_function(prediction.probability, previous_prediction.probability)
        
        if prediction.id not in score_dict:
            score_dict[prediction.id] = score 
        else:
            new_score = score_dict.get(prediction.id) + score
            score_dict.update({prediction.id: new_score })

    for user_id in score_dict.keys():
        current_user = User.query.get(user_id)
        new_score = current_user.score + score_dict[user_id]
        current_user.score = new_score
        db.session.commit()
        




def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def scoring_function(current_probability, previous_probability):
    return round(100 * math.log2(current_probability/previous_probability))
