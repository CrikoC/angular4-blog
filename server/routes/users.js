var express = require('express');
var passport = require('passport');

var userRoutes = function(User) {
    var UserRouter = express.Router();

    var userController = require('../controllers/userController')(User);

    //Register
    UserRouter.route('/register').post(userController.register);
    //Authenticate
    UserRouter.route('/authenticate').post(userController.authenticate);
    //Profile
    UserRouter.get('/profile', passport.authenticate('jwt', {session:false}), function (req,res) {
        res.json({user: req.user});
    });

    return UserRouter;
};

module.exports = userRoutes;