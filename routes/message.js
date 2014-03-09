var Message = require('../models/Message.js');

exports.add = function(req, res) {
  var msg;
  if (!req.body || !req.body.sender || !req.body.receiver || !req.body.message) {
    res.json(400, {error: 'All parameters not given'});
  } else {
    msg = new Message({
      sender: req.body.sender,
      receiver: req.body.receiver,
      message: req.body.message,
      timestamp: new Date()
    });
    msg.save(function(err, msg) {
      if (err) {
        res.json(500, {error: err});
      } else {
        res.json(201, msg);
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
