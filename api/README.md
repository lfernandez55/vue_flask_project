
This api builds on top of flask-httpauth

See: https://flask-httpauth.readthedocs.io/en/latest/

as well as flask-user

See: https://flask-user.readthedocs.io/en/latest/basic_app.html


API routes:

General desc:  Return token for token based authorization
Request headers: Basic authorization, username and password.
Returns: token
GET 
http://127.0.0.1:5000/api/token

General desc: Returns user's account data
Request headers: Basic auth with token*
Returns: user's basic account data in json format
GET
http://127.0.0.1:5000/api/account

General desc: Updates user's firstname and/or lastname
Request headers: Basic auth with token*
Returns: user's basic account data in json format
PUT
http://127.0.0.1:5000/api/profile

General desc: Returns list of all users
Request headers: Basic auth with token*
Returns: list of all users
GET
http://127.0.0.1:5000/api/admin/users

General desc: Returns a list of all roles
Request headers: Basic auth with token*
Returns list of all roles
GET

General desc: Updates an account
Request headers: Basic auth with token*, and user object with id
Returns: {'operation': 'success'}
PUT
http://127.0.0.1:5000/api/admin/user

General desc: Creates an account
Request headers: Basic auth with token*, and user object
Returns: {'operation': 'success'}
POST
http://127.0.0.1:5000/api/admin/user

General desc: Deletes an account
Request headers: Basic auth with token*, and user object with id
Returns: {'operation': 'success'}
DELETE
http://127.0.0.1:5000/api/admin/user

General desc: Updates a role
Request headers: Basic auth with token*, and role object with id
Returns: {'operation': 'success'}
PUT
http://127.0.0.1:5000/api/admin/role

General desc: Creates a role
Request headers: Basic auth with token*, and role object
Returns: {'operation': 'success'}
POST
http://127.0.0.1:5000/api/admin/role

General desc: Deletes a role
Request headers: Basic auth with token*, and role object with id
Returns: {'operation': 'success'}
DELETE
http://127.0.0.1:5000/api/admin/role

*Basic auth with token requires token and random string.