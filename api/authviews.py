from app import app
from app import auth
from app import User, g
from flask import Flask, abort, request, jsonify, url_for, render_template, make_response

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

@app.route('/login')
def login():
    return render_template('login.html')

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
    print(request.headers)
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})


@app.route('/api/resource')
# @auth.login_required(role='admin')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.username})


# See https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
# search on 401 replacing with 403
@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 403)


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
    print(auth.current_user())
    print(g.user.username)
    sqlStatement = "SELECT roles.name FROM roles JOIN user_roles ON roles.id=user_roles.role_id JOIN users ON users.id=user_roles.user_id WHERE users.username='" + g.user.username + "'"
    lt = db.engine.execute(sqlStatement)
    # converts tuple list to list:
    tupleToList = [item for t in lt for item in t] 
    # print(roleName)
    # roleName = [row for row in roleName]

    # print(roleName)
    # return ['admin']
    # return user.get_roles()
    return tupleToList



@app.route('/api/any')
@auth.login_required()
def api_role():
    return jsonify({'username': g.user.username, 'role': 'any'})

@app.route('/api/admin')
@auth.login_required(role='admin')
def api_role_a():
    return jsonify({'username': g.user.username, 'role': 'admin'})

@app.route('/api/member')
@auth.login_required(role='member')
def api_role_c():
    return jsonify({'username': g.user.username, 'role': 'member'})  

@app.route('/api/admin_member')
@auth.login_required(role=['admin', 'member'])
def api_role_b():
    return jsonify({'username': g.user.username, 'role': 'admin_member'})  
