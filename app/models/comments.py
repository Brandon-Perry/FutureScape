from .db import db
from sqlalchemy.schema import Table

comments = db.Table('comments', 
            db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
            db.Column('event_id', db.Integer, db.ForeignKey('events.id'), nullable=False),
            db.Column('comment', db.String(500), nullable=False)
            )