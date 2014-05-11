'use strict';

var mongoose = require('mongoose')
  , util = require('../lib/util')
  ;

var userSchema = mongoose.Schema({
  publicKey: String,
  guid: String
});

userSchema.pre('save', function (next) {
  this.guid = util.generateGuid();
  next();
});

module.exports = mongoose.model('User', userSchema);
