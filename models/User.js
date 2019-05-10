const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  // id is automatically generated
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    // Preventing duplicate mails
    validate: {
      validator: async email =>
        (await User.where({ email }).countDocuments()) === 0,
      message: 'Email has been taken'
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'member'
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
