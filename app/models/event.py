from .db import db
from sqlalchemy.orm import relationship
from .prediction import predictions
from .comments import comments

class Event(db.Model):

    __tablename__='events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    expires = db.Column(db.DateTime, nullable=False)
    resolved = db.Column(db.Boolean, default=False)
    outcome = db.Column(db.String, default=None)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    payoff = db.Column(db.Integer, default=100)
    demo_event = db.Column(db.Boolean, default=False)

    users = db.relationship('User', secondary=predictions, back_populates='events')
    comments = db.relationship('User', secondary=comments, back_populates='events')