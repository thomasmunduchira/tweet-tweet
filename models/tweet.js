var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  tweetText: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Tweet', tweetSchema);