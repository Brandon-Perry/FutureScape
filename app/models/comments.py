from .db import db
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship
from .user import User
from .event import Event



class Comment(db.Model):

    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    user = db.relationship('User', primaryjoin=user_id==User.id, back_populates='comments')
    event = db.relationship('Event', primaryjoin=event_id==Event.id, back_populates='comments')

    def to_dict_event(self):
        return {
            'user_id':self.user_id,
            'event_id':self.event_id,
            'comment':self.comment,
            'user':self.user,
        }