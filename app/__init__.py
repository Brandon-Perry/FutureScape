import os
from flask import Flask, request, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS
import os


from .config import Config
from .seeds import seed_commands
from .models import db, User

from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.category_routes import category_routes
from .api.event_routes import event_routes
from .api.prediction_routes import prediction_routes
from .api.comment_routes import comment_routes


#App initilization and login
app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.cli.add_command(seed_commands)

app.config.from_object(Config)

#Blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(category_routes, url_prefix='/api/categories')
app.register_blueprint(event_routes, url_prefix='/api/events')
app.register_blueprint(prediction_routes, url_prefix='/api/predictions')
app.register_blueprint(comment_routes, url_prefix='/api/comments')


#DB initialization
db.init_app(app)
Migrate(app, db)

CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code) 

@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
            generate_csrf(),
            secure=True if os.environ.get(
                'FLASK_ENV') == 'production' else False,
                samesite='Strict' if os.environ.get(
                    'FLASK_ENV') == 'production' else None,
                httponly=True
                )
    return response





# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     print(f'caught_path: {path}')
#     path_dir = os.path.abspath("./react-app/build")  # path react build
#     if path and (os.path.exists(f'./react-app/build/static/{path}') or
#                  os.path.exists(f'./react-app/build/{path}')):
#         return send_from_directory(os.path.join(path_dir), path)
#     else:
#         return send_from_directory(os.path.join(path_dir), 'index.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
