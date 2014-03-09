var Message = require('../models/Message.js');

exports.add = function(req, res, next) {
  var msg;
  if (!req.body || !req.body.sender || !req.body.receiver || !req.body.message) {
    next(new Error('Not enough data provided'));
  } else {
    msg = new Message({
      sender: req.body.sender,
      receiver: req.body.receiver,
      message: req.body.message,
      timestamp: new Date()
    });
    msg.save(function(err, msg) {
      if (err) {
        next(new Error(err));
      } else {
        res.redirect('/');
      }
    });
  }
};

exports.list = function(req, res) {
  Message.find(function(err, messages) {
    if (err) {
      res.json(500, {error: err});
    } else {
      res.json(messages);
    }
  });
};
