
This api build on top of flask-httpauth
See: https://flask-httpauth.readthedocs.io/en/latest/

API routes:

General desc:  Return token for token based authorization
Request headers: Basic authorization, username and password.
Returns token
GET 
http://127.0.0.1:5000/api/token

General desc: Returns user's account data
Request headers: Basic auth with token*
Returns user's basic account data in json format
GET
http://127.0.0.1:5000/api/account

General desc: Updates user's firstname and/or lastname
Request headers: Basic auth with token*
Returns user's basic account data in json format
PUT
http://127.0.0.1:5000/api/profile

General desc: Returns list of all users
Request headers: Basic auth with token*
GET
http://127.0.0.1:5000/api/admin/users

*Basic auth with token requires token and random string.