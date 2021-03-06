const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

module.exports = async req => {
  let currentUser = null;
  let token = null;
  let decodedToken = null;
  try {
    token = req.headers.authorization;
    if (!token) {
      return currentUser;
    }

    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return currentUser;
    }

    currentUser = await User.findById(decodedToken.userId).select('-password');
  } catch (err) {
    throw new Error('Unable to authenticate user');
  }

  return { currentUser };
};
