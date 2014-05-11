'use strict';

var router = require('express').Router()
  , _ = require('lodash')
  , User = require('../models/User')
  , util = require('../lib/util')
  ;

router.param('user_guid', function (req, res, next, guid) {
  if (!util.isGuid(guid)) {
    return next({ status: 400, message: 'Invalid GUID' });
  }

  User.find({ guid: guid }, function (err, users) {
    if (err) { return next(err); }
    if (_.isEmpty(users)) {
      return next({ status: 404, message: 'User not found' });
    }

    req.user = users[0];
    next();
  });
});

router.get('/:user_guid', function (req, res) {
  res.json(req.user);
});

router.post('/', function (req, res) {
  var user;
  if (!req.body || !req.body.publicKey) {
    res.json(400, { error: 'All parameters not given' });
  } else {
    user = new User({ publicKey: req.body.publicKey });
    user.save(function (err, user) {
      if (err) {
        res.json(500, { error: err });
      } else {
        res.json(201, user);
      }
    });
  }
});

module.exports = router;
