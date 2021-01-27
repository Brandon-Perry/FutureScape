from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import CheckConstraint
from .user import User
from .event import Event
import datetime
# from sqlalchemy.schema import Table


# predictions = db.Table('predictions',
#             db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
#             db.Column('event_id', db.Integer, db.ForeignKey('events.id'), nullable=False),
#             db.Column('choice_id', db.Integer, db.ForeignKey('choices.id'), nullable=False)
#             )


class Prediction(db.Model):

    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    choice_id = db.Column(db.Integer, db.ForeignKey('choices.id'), nullable=False)
    probability = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow())

    __table_args__ = (
        CheckConstraint('probability >= 0'),
        CheckConstraint('probability <= 100')
        )

    users = db.relationship('User', primaryjoin=user_id==User.id, back_populates='events')
    events = db.relationship('Event', primaryjoin=event_id==Event.id, back_populates='predictions')
    choices = db.relationship('Choice', back_populates='predictions')

    def to_dict(self):
        return {
            'user_id':self.user_id,
            'event_id':self.event_id,
            'choice_id':self.choice_id,
            'probability':self.probability,
            'users':self.users,
            'events':self.events,
            'choices':self.choices,
            'created_at':self.created_at,
        }

    def to_dict_min(self):
        return {
            'user_id':self.user_id,
            'event_id':self.event_id,
            'choice_id':self.choice_id,
            'probability':self.probability,
            'created_at':self.created_at,
        }

    def to_dict_event(self):
        return {
            'user_id':self.user_id,
            'event_id':self.event_id,
            'choice_id':self.choice_id,
            'probability':self.probability,
            'users':self.users,
            'choices':self.choices,
            'created_at':self.created_at,
        }