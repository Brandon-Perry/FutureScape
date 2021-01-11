from flask import Blueprint, jsonify, request

from ..models import Event 

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
def get_all_events():
    print('hit route get_all_Events')
    events = Event.query.all()
    data = [event.to_dict() for event in events]
    for el in data:
        new_list = []
        for prediction in el['users']:
            new_list.append(prediction.to_dict_min())
        el['users'] = new_list
    print('---------------')
    print(data)
    print('----------------')
    return jsonify(data)