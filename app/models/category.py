from .db import db
from sqlalchemy.orm import relationship

class Category(db.Model):

    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    events = db.relationship('Event', back_populates='category')

    