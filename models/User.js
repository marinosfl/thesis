const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  // id is automatically generated
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// HASHING USER PASSWORD
UserSchema.pre('save', async function(next) {
  try {
    // Genarate a salt
    const salt = await bcrypt.genSalt(12);
    // Generate hashed password (salt + hash)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over plain text password
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
