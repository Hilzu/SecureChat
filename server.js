var
  express = require('express'),
  http = require('http'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  messages = require('./routes/message'),
  users = require('./routes/user'),
  Message = require('./models/Message'),
  app,
  db;

app = express();
mongoose.connect('mongodb://localhost/SecureChat?auto_reconnect');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.param('receiver', function(req, res, next, receiver_id) {
  req.receiver = receiver_id;
  next();
});

app.param('user_id', function(req, res, next, user_id) {
  User.find({hash: user_id}, function(err, user) {
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
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.json(err.status, {error: err.message});
});


module.exports = app;
