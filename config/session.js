var config = require('./config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});

var sessionSettings = config.session;
sessionSettings.store = sessionStore;

module.exports = session(sessionSettings);