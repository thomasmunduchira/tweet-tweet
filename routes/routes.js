var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Tweet = require('../models/tweet');
var passport = require('../config/passport');

router.get('/welcome', function(req, res) {
  res.render('pages/welcome', { 
    title: 'Welcome',
    scriptFile: 'welcome.js',
  });
});

router.post('/addTweet', function(req, res) {
  var tweet = new Tweet({
    tweetText: req.body.tweetText,
    imageSrc: req.body.imageSrc
  });
  tweet.save(function(err, savedTweet) {
    if (err) {
      return console.error(err);
    } else {
      res.send(tweet._id);
    }
  });
});

router.post('/deleteTweet', function(req, res) {
  Tweet.find({
    _id: req.body.tweetId
  }).remove(function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("Deleted");
    res.send("Deleted");
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', {
    title: 'Home',
    scriptFile: 'index.js'
  });
});

module.exports = router;
