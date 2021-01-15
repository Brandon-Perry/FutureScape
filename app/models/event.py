from .db import db
from sqlalchemy.orm import relationship
# from .prediction import predictions
# from .comments import comments

class Event(db.Model):

    __tablename__='events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    expires = db.Column(db.DateTime, nullable=False)
    resolved = db.Column(db.Boolean, default=False)
    outcome = db.Column(db.String, default=None)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    payoff = db.Column(db.Integer, default=100)
    demo_event = db.Column(db.Boolean, default=False)

    predictions = db.relationship('Prediction', back_populates='events')
    category = db.relationship('Category', back_populates='events')
    comments = db.relationship('Comment', back_populates='event')

    def to_dict_main_app(self):
        return {
            'id':self.id,
            'title': self.title,
            'description': self.description,
            'expires': self.expires,
            'resolved': self.resolved,
            'outcome':self.outcome,
            'category':self.category,
            'payoff': self.payoff,
            'demo_event': self.demo_event,
            'predictions':self.predictions,
            # 'comments':self.comments
        }

    def to_dict_full(self):
        return {
            'id':self.id,
            'title': self.title,
            'description': self.description,
            'expires': self.expires,
            'resolved': self.resolved,
            'outcome':self.outcome,
            'category':self.category,
            'payoff': self.payoff,
            'demo_event': self.demo_event,
            'predictions':self.predictions,
            'comments':self.comments
        }