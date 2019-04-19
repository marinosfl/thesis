const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // id is automatically generated
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
