var passport = require('passport');
var User = require('../models/user');

passport.use('local', User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
