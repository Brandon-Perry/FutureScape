from .db import db
from sqlalchemy.orm import relationship

class Choice(db.Model):

    __tablename__ = 'choices'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String('55'), nullable=False)

    predictions = db.relationship('Prediction', back_populates='choices')