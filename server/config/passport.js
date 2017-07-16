const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config        = require('./database');
const User          = require('../models/user');

module.exports = function(passport) {
    const opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
         User.getUserById(jwt_payload._doc._id, function(err, user) {
            if(err) {
                return done(err,false);
            }
            if(user) {
                return done(null,user);
            } else {
                return done(null, false);
            }
        });
    }));
};