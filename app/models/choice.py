from .db import db
from sqlalchemy.orm import relationship

from .prediction import predictions
class Choice(db.Model):

    __tablename__ = 'choices'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String('55'), nullable=False)
    events = db.relationship('Event', secondary=predictions, back_populates='choices')