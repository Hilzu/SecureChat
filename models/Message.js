'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema);
