'use strict';

var router = require('express').Router()
  , Message = require('../models/Message.js')
  ;

router.param('receiver_guid', function (req, res, next, guid) {
  Message.find({ receiver: guid }, function (err, messages) {
    if (err) {
      return next(err);
    } else if (!messages) {
      return next(new Error('Messages with receiver not found'));
    }

    req.messages = messages;
    next();
  });
});

router.get('/:receiver_guid', function (req, res) {
  res.json(req.messages);
});

router.post('/', function (req, res) {
  var msg;
  if (!req.body.sender || !req.body.receiver || !req.body.message) {
    res.json(400, { error: 'All parameters not given' });
  } else {
    msg = new Message({
      sender: req.body.sender,
      receiver: req.body.receiver,
      message: req.body.message,
      timestamp: new Date()
    });
    msg.save(function (err, msg) {
      if (err) {
        res.json(500, { error: err });
      } else {
        res.json(201, msg);
      }
    });
  }
});

module.exports = router;
