var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  tweetText: String,
  imageSrc: String,
  user: String
});

module.exports = mongoose.model('Tweet', tweetSchema);