from flask import Blueprint, jsonify, request 

from ..models import db, Prediction, Event, User, Choice, Comment
from .helperFunctions import unpack_users_from_comments

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'])
def create_comment():
    new_comment = Comment()

    new_comment.user_id = request.get_json().get('user_id')
    new_comment.event_id = request.get_json().get('event_id')
    new_comment.comment = request.get_json().get('comment')

    current_user = User.query.get(new_comment.user_id)
    current_event = Event.query.get(new_comment.event_id)

    new_comment.user = current_user
    new_comment.event = current_event

    db.session.add(new_comment)
    db.session.commit()

    updated_event = Event.query.get(new_comment.event_id)
    data = updated_event.to_dict_full()
    updated_comments = data['comments']
    updated_comments = [comment.to_dict_event() for comment in updated_comments]
    updated_comments = unpack_users_from_comments(updated_comments)
    # print('----------')
    # print(data)
    # print(updated_comments)
    # print('----------')
    
    return {'comments':updated_comments}