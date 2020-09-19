#!/usr/bin/env python
import os
import time
from flask import Flask, abort, request, jsonify, g, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from flask import make_response
from functools import wraps

# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# extensions
db = SQLAlchemy(app)
auth = HTTPBasicAuth()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, nullable=False, unique=True)
    password_hash = db.Column(db.String(64))
    email = db.Column(db.String(255, collation='NOCASE'), nullable=False, unique=True)
    firstname = db.Column(db.String(100, collation='NOCASE'), nullable=False, server_default='')
    lastname = db.Column(db.String(100, collation='NOCASE'), nullable=False, server_default='')

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
    
db.create_all()


# Create 'member@example.com' user with no roles
if not User.query.filter(User.email == 'member@example.com').first():
    user = User(
        email='member@example.com',
        firstname='Momo',
        lastname='Man',
        username='momoman'            
    )
    user.hash_password('black')
    user.roles.append(Role(name='member'))
    db.session.add(user)
    db.session.commit()

# Create 'admin@example.com' user with 'Admin' and 'Agent' roles
if not User.query.filter(User.email == 'lfernandez@weber.edu').first():
    user = User(
        email='lfernandez@weber.edu',
        firstname='Luke',
        lastname='Fern',
        username='lfernandez' 
    )
    user.hash_password('white')
    user.roles.append(Role(name='admin'))
    user.roles.append(Role(name='agent'))
    db.session.add(user)
    db.session.commit()


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
    email = request.json.get('email')
    firstname = request.json.get('password')
    lastname = request.json.get('lastname')

    if username is None or password is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    user = User(username=username,firstname=firstname,lastname=lastname,email=email)
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


# See https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
# search on 401 replacing with 403
@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 403)


def restricted(access_level):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(access_level)
            # print(g.user.username)
            # username = request.json.get('username')
            print(request.headers.get('Authorization'))
            user = "lfernandez@weber.edu"
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


@app.route('/api/testrole')
# @auth.login_required(role='agent')
@auth.login_required(role=['admin', 'agent'])
def api_demo():
    print('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbxxxxx')
    print(g.user.username)
    return jsonify({'username': 'foobars'})

# see https://flask-httpauth.readthedocs.io/en/latest/
@auth.get_user_roles
def get_user_roles(user):
    print('in get_user_roles')
    print(user.username)
    sqlStatement = "SELECT roles.name FROM roles JOIN user_roles ON roles.id=user_roles.role_id JOIN users ON users.id=user_roles.user_id WHERE users.username='" + user.username + "'"
    lt = db.engine.execute(sqlStatement)
    # converts tuple list to list:
    tupleToList = [item for t in lt for item in t] 
    # print(roleName)
    # roleName = [row for row in roleName]

    # print(roleName)
    # return ['admin']
    # return user.get_roles()
    return tupleToList


if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()
    app.run(debug=True)