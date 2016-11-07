var express = require('express');
var router = express.Router();

var User = require('../models/user');
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {
    title: 'Home',
    scriptFile: 'index.js'
  });
});

router.get('/welcome', function(req, res) {
  res.render('pages/welcome', { 
    title: 'Welcome',
    scriptFile: 'welcome.js',
  });
});

router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password || !req.body.confirmPassword) {
    return res.json(h.fail('Missing one or more form fields.'));
  } else if(req.body.password !== req.body.confirmPassword) {
    return res.json(h.fail('Passwords don\'t match.'));
  }
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err) {
    if(err) {
      if(err.name === 'UserExistsError') {
        return res.json(h.fail('Username is taken.'));
      }
      return next(err);
    }
    res.json({success: true, redirect: '/app'});
  });
});
/*
router.post('/login', passport.authenticate('jwt', {
  session: false
}), function(req, res) {
  res.json({success: true, redirect: '/app'});
});
*/
module.exports = router;
