from .db import db
from sqlalchemy.schema import Table


predictions = db.Table('predictions',
            db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
            db.Column('event_id', db.Integer, db.ForeignKey('events.id'), nullable=False)
            db.Column('choice_id', db.Integer, db.ForeignKey('choices.id'), nullable=False)
            )