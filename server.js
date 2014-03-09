var
  express = require('express'),
  http = require('http'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  messages = require('./routes/message'),
  app,
  db;

app = express();
mongoose.connect('mongodb://localhost/SecureChat?auto_reconnect');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/messages', messages.list);
app.post('/messages', messages.add);

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
