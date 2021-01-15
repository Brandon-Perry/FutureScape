from flask import Blueprint, jsonify, request 

from ..models import db, Prediction, Event, User, Choice
from .helperFunctions import unpack_users_from_predictions, unpack_choice_from_predictions

prediction_routes = Blueprint('predictions', __name__)

@prediction_routes.route('/', methods=['POST'])
def create_prediction():
    # print('---------------------')
    # print('Hit create_prediction route')
    new_prediction = Prediction()

    new_prediction.user_id = request.get_json().get('user_id')
    new_prediction.event_id = request.get_json().get('event_id')
    new_prediction.choice_id = request.get_json().get('choice_id')
    new_prediction.probability = request.get_json().get('probability')
    # print('finished adding most attributes to new_prediction')
    # print(new_prediction)

    current_event = Event.query.get(new_prediction.event_id)
    current_user = User.query.get(new_prediction.user_id)
    current_choice = Choice.query.get(new_prediction.choice_id)
    # print('queried all other variables')

    new_prediction.users = current_user
    new_prediction.events = current_event
    new_prediction.choices = current_choice
    # print('finished adding users, events, and choices')

    db.session.add(new_prediction)
    db.session.commit()

    full_event = Event.query.get(new_prediction.event_id)
    full_event = full_event.to_dict_full()
    predictions = full_event['predictions']
    predictions = [prediction.to_dict_event() for prediction in predictions]
    
    predictions = unpack_choice_from_predictions(predictions)
    predictions = unpack_users_from_predictions(predictions)

    # print('-----------')
    
    # print(predictions)

    # print('------------')
    

    return {'predictions':predictions}