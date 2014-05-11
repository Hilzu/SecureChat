'use strict';

var express = require('express')
  , logger = require('morgan')
  , mongoose = require('mongoose')
  , path = require('path')
  , messages = require('./routes/messages')
  , users = require('./routes/users')
  , config = require('./lib/config')
  , app
  ;

app = express();

mongoose.connect(config.mongoUri, function (err) {
  if (err) {
    throw 'Couldn\'t connect to MongoDB: ' + err;
  }
});

app.use(logger(config.logger));
app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/messages', messages);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
  if (err.stack) {
    console.error(err.stack);
  }
});

module.exports = app;
