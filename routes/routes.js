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
    return res.send('Missing one or more fields.');
  } else if (req.body.password !== req.body.passwordConfirm) {
    return res.send('Passwords don\'t match.');
  }
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err) {
    if (err) {
      if (err.name === 'UserExistsError') {
        return res.send('Username is taken.');
      }
      return console.error(err);
    }
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/welcome', 
    // failureFlash: true
}));

router.get('/logout', isAuthenticated, function(req, res) {
  req.logout();
  res.redirect('/welcome');
});

router.post('/addTweet', isAuthenticated, function(req, res) {
  var tweet = new Tweet({
    tweetText: req.body.tweetText,
    imageSrc: req.body.imageSrc
  });
  tweet.save(function(err) {
    if (err) {
      return console.error(err);
    }
    res.send(tweet._id);
  });
});

router.post('/deleteTweet', isAuthenticated, function(req, res) {
  Tweet.find({
    _id: req.body.tweetId
  }).remove(function(err) {
    if (err) {
      return console.error(err);
    }
    res.send("Deleted");
  });
});

router.get('/allTweets', isAuthenticated, function(req, res) {
  Tweet.find(function(err, tweets) {
    if (err) {
      return console.error(err);
    }
    res.send(tweets);
  });
});

router.get('/', isAuthenticated, function(req, res) {
  res.render('pages/index', {
    title: 'Home',
    scriptFile: 'index.js',
    username: req.user.username
  });
});

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect('/welcome');
}

module.exports = router;