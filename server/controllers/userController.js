var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var userController = function(User) {

    var register = function(req,res) {
        //creating new instance of model and pass the bodyParser
        var user = new User(req.body);

        if(!req.body.username) {
            res.status(400);
            res.send('Name is required');
        }
        else if (!req.body.password) {
            res.status(400);
            res.send('Password is required');
        }
        else if (!req.body.email) {
            res.status(400);
            res.send('Email is required');
        }
        else {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(user.password,salt, function(err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                    //saving in db
                    user.save();
                    //status 201 means created
                    res.status(201);
                    //send result
                    res.send(user);
                });
            });
        }
    };
    
    var authenticate = function (req,res) {
        const username = req.body.username;
        const password = req.body.password;

        User.getUserByUsername(username, function(err, user) {
            if(err) throw err;
            if(!user) return res.json({success:false, msg:'User not found'});

            bcrypt.compare(password, user.password, function(err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign(user,config.secret, {expiresIn: 604800});

                    res.json({
                        success:true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email:user.email
                        }
                    });
                } else {
                    return res.json({success:false, msg:'Wrong password'});
                }
            });
        });
    };


    return {
        register: register,
        authenticate:authenticate
    };
};

module.exports = userController;
