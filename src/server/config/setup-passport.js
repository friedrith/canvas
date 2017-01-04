const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const passwordHelper = require('../helpers/password');

function init() {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, done);
    });


    // to authenticate with email: http://blog.robertonodi.me/node-authentication-series-email-and-password/
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                where: { email: email }
            }).then(function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                passwordHelper.hash(password, function (err, hash) {
                    if (err) {
                        return done(err);
                    }

                    if (hash != user.password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            });
        }
    ));
}

module.exports.init = init;
