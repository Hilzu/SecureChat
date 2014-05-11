'use strict';

var router = require('express').Router();
var User = require('../models/User.js');

router.param('user_guid', function (req, res, next, guid) {
  User.find({guid: guid}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('User not found'));
    }

    req.user = user;
    next();
  });
});

router.get('/:user_guid', function (req, res) {
  res.json(req.user);
});

router.post('/', function (req, res) {
  var user;
  if (!req.body || !req.body.publicKey) {
    res.json(400, {error: 'All parameters not given'});
  } else {
    user = new User({publicKey: req.body.publicKey});
    user.save(function (err, user) {
      if (err) {
        res.json(500, {error: err});
      } else {
        res.json(201, user);
      }
    });
  }
});

module.exports = router;
