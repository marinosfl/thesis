const { PubSub } = require('apollo-server');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Action = require('./models/Action');
const userValidation = require('./validation/user');

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    user: async (root, args, ctx) => {
      const user = await User.findById(args._id);
      return user;
    },
    users: async (root, args, ctx) => {
      const users = await User.find({});
      return users;
    },
    action: async (root, args, ctx) => {
      const action = await Action.findById(args._id);
      return action;
    },
    actions: async (root, args, ctx) => {
      console.log(ctx.currentUser);
      const actions = await Action.find({});
      return actions;
    },
    login: async (root, { email, password }, ctx) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User does not exist!');
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Password is incorrect');
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        userId: user.id,
        token,
        tokenExpiration: 1,
        currentUser: user
      };
    }
  },
  Mutation: {
    register: async (root, args, ctx) => {
      try {
        // validating fields with
        await Joi.validate(args.register, userValidation, {
          abortEarly: false
        });

        const newUser = await new User({
          ...args.user
        }).save();

        // hidding the password from the return for security reasons
        newUser.password = null;
        return newUser;
      } catch (err) {
        throw err;
      }
    },
    createAction: authenticated(async (root, args, ctx) => {
      const newAction = await new Action({
        ...args.action,
        author: '5cbe3e00ef90cf692d73c9cf'
      }).save();
      const actionAdded = await User.populate(newAction, 'author');
      return actionAdded;
    })
  }
};
