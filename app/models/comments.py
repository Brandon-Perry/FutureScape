from .db import db
from sqlalchemy.schema import Table

# comments = db.Table('comments', 
#             db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
#             db.Column('event_id', db.Integer, db.ForeignKey('events.id'), nullable=False),
#             db.Column('comment', db.String(500), nullable=False)
#             )


class Comment(db.Model):

    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False),
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False),
    comment = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', back_populates='events')
    event = db.relationship('Event', back_populates='users')

