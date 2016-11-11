var config = {
  session: {
    secret: 'hello',
    saveUninitialized: false,
    resave: false,
  },
  db: {
    url: 'mongodb://localhost:27017/tweet-tweet',
  }
};

module.exports = config;