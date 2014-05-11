'use strict';

var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var messages = require('./routes/messages');
var users = require('./routes/users');

var app;
var mongoUri;

app = express();

mongoUri = process.env.MONGOLAB_URI ||
  'mongodb://localhost/SecureChat?auto_reconnect';
mongoose.connect(mongoUri, function (err) {
  if (err) {
    throw 'Couldn\'t connect to MongoDB: ' + err;
  }
});

app.use(logger('dev'));
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
  if (err.status !== 404) {
    console.error(err.stack);
  }
});

module.exports = app;
