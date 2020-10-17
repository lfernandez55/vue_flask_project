The code in this repo contains a SPA and api.  When both are spun up the user is presented with the app depicted in the following screencast:
https://www.screencast.com/t/Gika5P5DU

In your first terminal, `cd` into the "api" folder. Start a virtual environment, and install the libraries in the requirements file.  Use `flask run` to start your Flask api in development server on localhost:5000.

In your second terminal, `cd` into the "webapp" folder. Install your node dependencies with `npm install`. Run the development version of the Vue webapp with `npm run serve`. The webapp will be running on localhost:8080.

Accounts:

Username: lfernandez
Password: white
Roles: admin, agent

Username: momoman
Password: blue
Roles: member

---------------

The contents in /api were created using standard Flask dev processes. See the readme in root/API for a description of the derivative projects.

The initial contents in /webapp were created by opening a terminal at root (where this readme is located) and typing vue create webapp

The general organization of the code is explained in Combining Flask and Vue: Single Page Application: https://testdriven.io/blog/combine-flask-vue/