# Getting Mongo up and running:
* download Mongo on your computer
* run command 'mongo' in terminal
* run 'use picnicHealth' to create new db

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
- Has our MongoDB schemas. See babyUser.js for simple example of a schema and user.js for a more sophisticated example
2) routes 
- These are our controllers and endpoints for the server
- Naming convention: name it the same as its model i.e. for the babyUser endpoints, there is a babyUser.js model and a babyUser.js route