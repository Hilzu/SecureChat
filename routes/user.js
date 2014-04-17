var User = require('../models/User.js');

exports.get = function (req, res) {
  User.find({hash: req.params.user}, function (err, user) {
    if (err) {
      res.json(500, {error: err});
    } else if (!user) {
      res.json(404, {error: "User not found"});
    } else {
      res.json(user);
    }
  });
};

exports.add = function (req, res) {
  var user;
  if (!req.body || !req.body.hash || !req.body.publicKey) {
    res.json(400, {error: 'All parameters not given'});
  } else {
    user = new User({hash: req.body.hash, publicKey: req.body.publicKey});
    user.save(function (err, user) {
      if (err) {
        res.json(500, {error: err});
      } else {
        res.json(201, user);
      }
    });
  }
};
