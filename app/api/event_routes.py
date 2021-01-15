from flask import Blueprint, jsonify, request

from ..models import Event 
from .helperFunctions import unpack_category, unpack_choice_from_predictions, unpack_predictions, unpack_users_from_comments, unpack_users_from_predictions

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
    






# def unpack_comments(data):
    
#     for el in data:
#         new_list = []
#         for prediction in el['comments']:
#             new_list.append(prediction.to_dict_min())
#         el['comments'] = new_list
    
#     return data