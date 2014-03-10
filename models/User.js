var mongoose = require('mongoose');

userSchema = mongoose.Schema({
  publicKey: String,
  hash: String
});

module.exports = mongoose.model('User', userSchema);
