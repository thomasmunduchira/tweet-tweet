var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Tweet = require('../models/tweet');
var passport = require('../config/passport');

/* GET home page. */
router.get('/welcome', function(req, res) {
  res.render('pages/welcome', { 
    title: 'Welcome',
    scriptFile: 'welcome.js',
  });
});

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.passwordConfirm) {
    return res.json({
      success: false,
      message: 'Missing one or more fields.'
    });
  } else if (req.body.password !== req.body.passwordConfirm) {
    return res.json({
      success: false,
      message: 'Passwords don\'t match.'
    });
  }
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err) {
    if (err) {
      if (err.name === 'UserExistsError') {
        return res.json({
          success: false,
          message: 'Username is taken.'
        });
      }
      return console.error(err);
    }
    res.json({
      success: true,
      redirect: '/welcome'
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({
    success: true,
    redirect: '/'
  });
});

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/welcome');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.json({
    success: true,
    redirect: '/welcome'
  });
});

router.get('/tweets', function(req, res) {
  Tweet.find({
    user: req.user.username
  }, function(err, tweets) {
    if (err) {
      return console.error(err);
    }
    res.json({
      success: true,
      tweets: tweets
    });
  });
});

router.post('/tweet', function(req, res) {
  var tweet = new Tweet({
    tweetText: req.body.tweetText,
    imageSrc: req.body.imageSrc,
    user: req.user.username
  });
  tweet.save(function(err) {
    if (err) {
      return console.error(err);
    }
    res.json({
      success: true,
      tweetId: tweet._id
    });
  });
});

router.delete('/tweet/:id', function(req, res) {
  Tweet.findOneAndRemove({
    _id: req.params.id,
    user: req.user.username
  }, function(err) {
    if (err) {
      return console.error(err);
    }
    res.json({
      success: true
    });
  });
});

router.get('/', function(req, res) {
  res.render('pages/index', {
    title: 'Home',
    scriptFile: 'index.js',
    username: req.user.username
  });
});

module.exports = router;
