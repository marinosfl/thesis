const { AuthenticationError, PubSub } = require('apollo-server');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Action = require('./models/Action');
const userValidation = require('./validation/user');

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new Error('You must be logged in');
  }
  return next(root, args, ctx, info);
};

const autoLogin = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    return;
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: autoLogin((root, args, ctx) => ctx.currentUser),
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
      const actions = await Action.find({});
      return actions;
    },
    login: async (root, { email, password }, ctx) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      return { token };
    },
    meActions: authenticated(async (root, args, ctx) => {
      const actions = await Action.find({ author: args.authorId }).populate(
        'author'
      );

      return actions;
    })
  },
  Mutation: {
    register: async (root, args, ctx) => {
      try {
        const userExists = await User.findOne({ email: args.user.email });

        if (userExists) {
          throw new AuthenticationError(
            'An account with this email already exists.'
          );
        }

        // validating fields with
        Joi.validate(args.user, userValidation, (err, value) => {
          throw new Error(err.message);
        });

        console.log('sdada');
        // console.log(error);
        // if (error) {
        //   throw new Error(error);
        // }

        const newUser = await new User({
          ...args.user
        }).save();

        const token = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        );

        return { token };
      } catch (err) {
        console.log('wtf');
        throw new Error(err);
      }
    },
    updateProfile: authenticated(async (root, args, ctx) => {
      const { firstName, lastName, email } = args.profileData;
      const updatedProfile = await User.findOneAndUpdate(
        { _id: ctx.currentUser._id },
        { $set: { firstName, lastName, email } },
        { new: true }
      );
      updatedProfile.password = null;
      return updatedProfile;
    }),
    createAction: authenticated(async (root, args, ctx) => {
      const newAction = await new Action({
        ...args.action,
        author: ctx.currentUser._id
      }).save();
      const actionAdded = await User.populate(newAction, 'author');
      return actionAdded;
    })
  }
};
