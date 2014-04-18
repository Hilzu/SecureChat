'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  publicKey: String,
  hash: String
});

module.exports = mongoose.model('User', userSchema);
