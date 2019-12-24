# Getting Mongo up and running:
* download Mongo on your computer
* run command 'mongo' in terminal
* run 'use <DB_NAME>' to create new db

# Running backend
* npm install
* npm start

# Next Steps
* Make Doctor login + dashboard to see their pat
* Labs model 

# Code walkthrough
app.js is the meat of the server
In the app directory, there are two subdirectories: models and routes
1) models
- Has our MongoDB schemas. See user.js for an example
2) routes 
- These are our controllers and endpoints for the server
- Naming convention: name it the same as its model i.e. for the user endpoints, there is a user.js model and a user.js route