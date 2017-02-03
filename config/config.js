var config = {
  session: {
    secret: 'hello',
    saveUninitialized: false,
    resave: false,
  },
  db: {
    url: 'mongodb://thomasmunduchira:thomasmunduchira@ds159517.mlab.com:59517/tweet-tweet',
  }
};

module.exports = config;
