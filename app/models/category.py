from .db import db

class Category(db.Model):

    __tablename__ = 'categories'

        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String, nullable=False)
        events = db.Relationship('Event', back_populates='categories')