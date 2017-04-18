const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const Question = require('../models/question');
const {database} = require('./google');
const mongoose = require('mongoose')
mongoose.promise = global.promise;

passport.use(
    new BearerStrategy(
        (token, done) => {
            console.log(`Token: ${token}`)
            User.findOne({accessToken: token})
                .then(user => {
                    console.log(user)
                    return done(null, database[token]);
                })
                .catch(err => {
                    return done(null, false);
                })
            }
    )
);

module.exports = passport;
