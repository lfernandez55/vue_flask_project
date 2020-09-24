# This file contains an example Flask-User application.
# To keep the example simple, we are applying some unusual techniques:
# - Placing everything in one file
# - Using class-based configuration (instead of file-based configuration)
# - Using string-based templates (instead of file-based templates)..
# import os
# import time

import datetime
from flask import Flask, request, render_template_string, render_template, redirect, url_for, jsonify, g, abort
# from flask_babelex import Babel
from flask_sqlalchemy import SQLAlchemy
# from flask_user import current_user, login_required, roles_required, UserManager, UserMixin
# from pprint import pprint
from functools import wraps
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash

# Class-based application configuration
class ConfigClass(object):
    """ Flask application config """

    # Flask settings
    SECRET_KEY = 'This is an INSECURE secret!! DO NOT use this in production!!'

    # Flask-SQLAlchemy settings
    SQLALCHEMY_DATABASE_URI = 'sqlite:///basic_app3.sqlite'    # File-based SQL database
    SQLALCHEMY_TRACK_MODIFICATIONS = False    # Avoids SQLAlchemy warning

    # Flask-Mail SMTP server settings
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERNAME = 'xxxxxx@gmail.com'
    MAIL_PASSWORD = 'xxxxxx'
    MAIL_DEFAULT_SENDER = '"MyApp" <noreply@example.com>'

    # Flask-User settings
    USER_APP_NAME = "Flask-User Basic App"      # Shown in and email templates and page footers
    USER_ENABLE_EMAIL = True        # Enable email authentication
    USER_ENABLE_USERNAME = False    # Disable username authentication
    USER_EMAIL_SENDER_NAME = USER_APP_NAME
    USER_EMAIL_SENDER_EMAIL = "noreply@example.com"


def create_app():
    """ Flask application factory """

    # Create Flask app load app.config
    app = Flask(__name__)
    app.config.from_object(__name__+'.ConfigClass')
    app.config["SQLALCHEMY_ECHO"] = False

    # Initialize Flask-SQLAlchemy
    db = SQLAlchemy(app)

    auth = HTTPBasicAuth()

    # Define the User data-model.
    class User(db.Model):
        __tablename__ = 'users'
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(32), index=True)
        password_hash = db.Column(db.String(64))

        # User authentication information. The collation='NOCASE' is required
        # to search case insensitively when USER_IFIND_MODE is 'nocase_collation'.
        email = db.Column(db.String(255, collation='NOCASE'), nullable=False, unique=True)
        password = db.Column(db.String(255), nullable=False, server_default='')

        # User information
        first_name = db.Column(db.String(100, collation='NOCASE'), nullable=False, server_default='')
        last_name = db.Column(db.String(100, collation='NOCASE'), nullable=False, server_default='')

        # Define the relationship to Role via UserRoles
        roles = db.relationship('Role', secondary='user_roles')

        def hash_password(self, password):
            self.password_hash = generate_password_hash(password)

        def verify_password(self, password):
            return check_password_hash(self.password_hash, password)

        def generate_auth_token(self, expires_in=600):
            return jwt.encode(
                {'id': self.id, 'exp': time.time() + expires_in},
                app.config['SECRET_KEY'], algorithm='HS256')

        @staticmethod
        def verify_auth_token(token):
            try:
                data = jwt.decode(token, app.config['SECRET_KEY'],
                                algorithms=['HS256'])
            except:
                return
            return User.query.get(data['id'])


    # class User(db.Model):
    #     __tablename__ = 'users'
    #     id = db.Column(db.Integer, primary_key=True)
    #     active = db.Column('is_active', db.Boolean(), nullable=False, server_default='1')

    #     # User authentication information. The collation='NOCASE' is required
    #     # to search case insensitively when USER_IFIND_MODE is 'nocase_collation'.
    #     email = db.Column(db.String(255, collation='NOCASE'), nullable=False, unique=True)
    #     email_confirmed_at = db.Column(db.DateTime())
    #     password = db.Column(db.String(255), nullable=False, server_default='')

    #     # User information
    #     first_name = db.Column(db.String(100, collation='NOCASE'), nullable=False, server_default='')
    #     last_name = db.Column(db.String(100, collation='NOCASE'), nullable=False, server_default='')

    #     # Define the relationship to Role via UserRoles
    #     roles = db.relationship('Role', secondary='user_roles')

    #     username = db.Column(db.String(32), index=True)
    #     password_hash = db.Column(db.String(64))

    #     def hash_password(self, password):
    #         self.password_hash = generate_password_hash(password)

    #     def verify_password(self, password):
    #         return check_password_hash(self.password_hash, password)

    #     def generate_auth_token(self, expires_in=600):
    #         return jwt.encode(
    #             {'id': self.id, 'exp': time.time() + expires_in},
    #             app.config['SECRET_KEY'], algorithm='HS256')

    #     @staticmethod
    #     def verify_auth_token(token):
    #         try:
    #             data = jwt.decode(token, app.config['SECRET_KEY'],
    #                             algorithms=['HS256'])
    #         except:
    #             return
    #         return User.query.get(data['id'])

    # Define the Role data-model
    class Role(db.Model):
        __tablename__ = 'roles'
        id = db.Column(db.Integer(), primary_key=True)
        name = db.Column(db.String(50), unique=True)

    # Define the UserRoles association table
    class UserRoles(db.Model):
        __tablename__ = 'user_roles'
        id = db.Column(db.Integer(), primary_key=True)
        user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'))
        role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))

    # Setup Flask-User and specify the User data-model
    # user_manager = UserManager(app, db, User)

    # Create all database tables (every time a new table is added it runs this, otherwise it doesn't)
    db.create_all()

    # Create 'member@example.com' user with no roles
    if not User.query.filter(User.email == 'member@example.com').first():
        user = User(
            email='member@example.com'            
        )
        user.hash_password('Password1')
        user.roles.append(Role(name='member'))
        db.session.add(user)
        db.session.commit()

    # Create 'admin@example.com' user with 'Admin' and 'Agent' roles
    if not User.query.filter(User.email == 'luke.fernandez@gmail.com').first():
        user = User(
            email='luke.fernandez@gmail.com'
        )
        user.hash_password('Password2')
        user.roles.append(Role(name='admin'))
        user.roles.append(Role(name='agent'))
        db.session.add(user)
        db.session.commit()


    @app.route('/api/demo')
    def api_demo():
        return jsonify({'username': 'foobar'})
        
    @app.route('/api/demo1')
    @login_required
    def api_demo1():
        return jsonify({'username': 'foobar'})

    def superuser(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAINSIDE SUPERUSER", request)
            return redirect(url_for('not_authorized'))
            # if not g.user.superuser:
            #     flash("You do not have permission to view that page", "warning")
            #     abort(404)

            return f(*args, **kwargs)

        return decorated_function  

    @app.route('/api/demo2')
    @superuser
    def api_demo2():
        return jsonify({'username': 'foobar'})


    @app.route('/not_authorized')
    def not_authorized():
        return render_template_string("""
            {% extends "flask_user_layout.html" %}
            {% block content %}
                <h2>Not Authorized</h2>
            {% endblock %}
            """)

    def restricted(access_level):
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                print(access_level)
                user = "luke.fernandez@gmail.com"
                # user = "member@example.com"
                # sqlStatement = "SELECT roles.name FROM roles JOIN user_roles ON roles.id=user_roles.role_id JOIN users ON users.id=user_roles.user_id WHERE users.email='" + user + "' AND roles.name='" + access_level + "'"
                sqlStatement = "SELECT roles.name FROM roles JOIN user_roles ON roles.id=user_roles.role_id JOIN users ON users.id=user_roles.user_id WHERE users.email='" + user + "' AND roles.name IN (" + access_level + ")"
                
                
                roleName = db.engine.execute(sqlStatement)
                roleName = [row for row in roleName]
                # if len(roleName) > 0 and roleName[0]['name'] == 'member':
                if len(roleName) > 0:
                    returnValue = 1
                    print("authorized")
                else:
                    print("NOT authorized")
                return func(*args, **kwargs)
            return wrapper
        return decorator

    @app.route('/api/demo3')
    @restricted(access_level="'admin','member'")
    def api_demo3():
        return jsonify({'username': 'foobar'})


    #############################################FROM Grinberg my repo REST-auth#################################
    @auth.verify_password
    def verify_password(username_or_token, password):
        # first try to authenticate by token
        user = User.verify_auth_token(username_or_token)
        if not user:
            # try to authenticate with username/password
            user = User.query.filter_by(username=username_or_token).first()
            if not user or not user.verify_password(password):
                return False
        g.user = user
        return True

    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/api/users', methods=['POST'])
    def new_user():
        username = request.json.get('username')
        password = request.json.get('password')
        if username is None or password is None:
            abort(400)    # missing arguments
        if User.query.filter_by(username=username).first() is not None:
            abort(400)    # existing user
        user = User(username=username)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        return (jsonify({'username': user.username}), 201,
                {'Location': url_for('get_user', id=user.id, _external=True)})


    @app.route('/api/users/<int:id>')
    def get_user(id):
        user = User.query.get(id)
        if not user:
            abort(400)
        return jsonify({'username': user.username})


    @app.route('/api/token')
    @auth.login_required
    def get_auth_token():
        token = g.user.generate_auth_token(600)
        return jsonify({'token': token.decode('ascii'), 'duration': 600})


    @app.route('/api/resource')
    @auth.login_required
    def get_resource():
        return jsonify({'data': 'Hello, %s!' % g.user.username})

    ################################################END Grinberg



    return app


# Start development web server...
if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=4000, debug=True)
