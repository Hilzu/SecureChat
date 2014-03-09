var mongoose = require('mongoose');

messageSchema = mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema);
