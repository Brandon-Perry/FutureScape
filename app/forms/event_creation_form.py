from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from ..models import Event 



class CreateEventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    expires = DateField('expires', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])