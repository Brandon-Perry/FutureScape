from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy import CheckConstraint
from .user import User
from .event import Event
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

    __table_args__ = (
        CheckConstraint('probability >= 0'),
        CheckConstraint('probability <= 100')
        )

    users = db.relationship('User', primaryjoin=user_id==User.id, back_populates='events')
    event = db.relationship('Event', primaryjoin=event_id==Event.id, back_populates='users')
    choice = db.relationship('Choice', back_populates='choices')