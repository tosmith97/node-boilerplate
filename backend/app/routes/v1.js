const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController 	= require('./../controllers/UserController');

require('./../middleware/passport')(passport)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});


/**
 * User Endpoints
 */
/*
  POST Request
  Sample request:
    {
      "email": test@stanford.edu,
      "username": "coolio-beanz",
      "password": pwd,
      "birthday": "Jan 11 1997"
    }
*/ 
router.post('/users/', UserController.create);
router.get('/users/', passport.authenticate('jwt', {session:false}), UserController.get);
router.put('/users/', passport.authenticate('jwt', {session:false}), UserController.update);
router.delete('/users/', passport.authenticate('jwt', {session:false}), UserController.delete);

/*
  POST Request
  Sample request:
    {
      "email": test@gmail.com,
      "password": password
    }
*/ 
router.post('/users/login', UserController.login);

router.post('/users/refreshToken', passport.authenticate('jwt', {session:false}), UserController.refreshUserToken);

module.exports = router;
