from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from ..models import User 

def user_exists(form, field):
    email = field.data 
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No user with this email exists')

def password_matches(form, field):
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No user with this email exists')
    if not user.check_password(password):
        raise ValidationError('Password is incorrect')

class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])