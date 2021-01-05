import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config

# from .seeds import seed_commands

from .models import db

# app = Flask(__name__)

# app.config.from_object(Config)
# db.init_app(app)
# Migrate(app, db)


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)


@app.route('/hello')
def hello():
    return 'Hello, world!'

