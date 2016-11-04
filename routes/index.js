var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {
    title: 'Express',
    scriptFile: 'index.js'
  });
});

router.get('/welcome', function(req, res) {
  res.render('pages/welcome', { 
    title: 'Welcome',
    scriptFile: 'welcome.js',
  });
});

module.exports = router;
