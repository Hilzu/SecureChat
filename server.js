'use strict';

var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var User = require('./models/User');
var messages = require('./routes/message');
var users = require('./routes/user');

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

app.param('receiver', function (req, res, next, receiverId) {
  req.receiver = receiverId;
  next();
});

app.param('user_id', function (req, res, next, userId) {
  User.find({hash: userId}, function (err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
    }
  });
});

app.get('/messages/:receiver', messages.list);
app.post('/messages', messages.add);

app.get('/users/:user_id', users.get);
app.post('/users', users.add);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res) {
  res.json(err.status, {error: err.message});
});


module.exports = app;
