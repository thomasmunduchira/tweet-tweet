var passport = require('passport');
var passportJwt = require('passport-jwt');
var ExtractJwt = passportJwt.ExtractJwt;
var Strategy = passportJwt.Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';

passport.use(new Strategy(opts, function(jwt_payload, next) {
  User.findOne({
    email: jwt_payload.username
  }, function (err, user) {
    if (err) {
      return next(err, false);
    }

    if (!user) {
      return next(null, false, {
        message: 'User not found'
      });
    }

    if (!user.validPassword(password)) {
      return next(null, false, {
        message: 'Password is wrong'
      });
    }

    return next(null, user);
  });
}));