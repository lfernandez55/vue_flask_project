
This api builds on top of flask-httpauth

See: https://flask-httpauth.readthedocs.io/en/latest/

as well as flask-user

See: https://flask-user.readthedocs.io/en/latest/basic_app.html

For a rudimentary demo of how I use the auth api to get a token
and then to use that token to access other resources visit:

https://github.com/lfernandez55/fetch_with_vue

start up the server and visit localhost:5000.




API routes:

1.
General desc:  Return token for token based authorization
Request headers: Basic authorization, username and password.
Returns: token
GET 
http://127.0.0.1:5000/api/token

Sample return:
{
  "duration": 600, 
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjAyODk0NDgxLjExNDc5Nzh9.uF5EV9tDhnflOr6NOZpH3vRPBL0VCHNGFIkVzONz8Wo"
}

--------------------------------------------------------------------------
2.
General desc: Returns user's account data
Request headers: Basic auth with token*
Returns: user's basic account data in json format
GET
http://127.0.0.1:5000/api/account

Sample return:
{
  "email": "lfernandez@weber.edu", 
  "firstname": "Luke", 
  "lastname": "Fernx", 
  "roles": [
    {
      "id": 2, 
      "name": "admin"
    }, 
    {
      "id": 3, 
      "name": "agent"
    }
  ], 
  "username": "lfernandez"
}

----------------------------------------------------------------------------
3.
General desc: Updates user's firstname and/or lastname
Request headers: Basic auth with token*
Returns: user's basic account data in json format
PUT
http://127.0.0.1:5000/api/profile

Sample return:
{
  "email": "lfernandez@weber.edu", 
  "firstname": "Luke", 
  "lastname": "Fernxx", 
  "roles": [
    {
      "id": 2, 
      "name": "admin"
    }, 
    {
      "id": 3, 
      "name": "agent"
    }
  ], 
  "username": "lfernandez"
}

------------------------------------------------------------------------------
4.
General desc: Returns list of all users
Request headers: Basic auth with token*
Returns: list of all users
GET
http://127.0.0.1:5000/api/admin/users

Sample return:
[
  {
    "email": "member@example.com", 
    "firstname": "Momokd", 
    "id": 1, 
    "lastname": "Man", 
    "roles": [
      {
        "id": 2, 
        "name": "admin"
      }
    ], 
    "username": "momoman"
  }, 
  {
    "email": "lfernandez@weber.edu", 
    "firstname": "Luke", 
    "id": 2, 
    "lastname": "Fernxx", 
    "roles": [
      {
        "id": 2, 
        "name": "admin"
      }, 
      {
        "id": 3, 
        "name": "agent"
      }
    ], 
    "username": "lfernandez"
  }
]

------------------------------------------------------------------------------
5.
General desc: Returns a list of all roles
Request headers: Basic auth with token*
Returns list of all roles
GET

Sample return:
[
  {
    "id": 1, 
    "name": "member"
  }, 
  {
    "id": 2, 
    "name": "admin"
  }, 
  {
    "id": 3, 
    "name": "agent"
  }
]
------------------------------------------------------------------------------
6.
General desc: Updates an account
Request headers: Basic auth with token*, and user object with id
Returns: {'operation': 'success'}
PUT
http://127.0.0.1:5000/api/admin/user/{id}

Sample request user object:
{"email":"member@example.com","firstname":"Momo","id":1,"lastname":"Man","roles":[{"id":2,"name":"admin"}],"username":"momoman"}
------------------------------------------------------------------------------
7.
General desc: Creates an account
Request headers: Basic auth with token*, and user object
Returns: {'operation': 'success'}
POST
http://127.0.0.1:5000/api/admin/user

------------------------------------------------------------------------------
8.
General desc: Deletes an account
Request headers: Basic auth with token*, and user object with id
Returns: {'operation': 'success'}
DELETE
http://127.0.0.1:5000/api/admin/user/{id}

------------------------------------------------------------------------------
9.
General desc: Updates a role
Request headers: Basic auth with token*, and role object with id
Returns: {'operation': 'success'}
PUT
http://127.0.0.1:5000/api/admin/role/{id}

Sample request role object:
{"id":4,"name":"flunky"}
------------------------------------------------------------------------------
10.
General desc: Creates a role
Request headers: Basic auth with token*, and role object
Returns: {'operation': 'success'}
POST
http://127.0.0.1:5000/api/admin/role

------------------------------------------------------------------------------
11.
General desc: Deletes a role
Request headers: Basic auth with token*, and role object with id
Returns: {'operation': 'success'}
DELETE
http://127.0.0.1:5000/api/admin/role/{id}

*Basic auth with token requires token and random string. 
See webapp/store/modules/admin.js and webapp/store/modules/auth.js
to see how to create a valid auth request with a token in fetch

