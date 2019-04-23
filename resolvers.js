const { PubSuub } = require('apollo-server');

const User = require('./models/User');
const Action = require('./models/Action');

const users = [
  {
    _id: '1',
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    email: 'test@test.com',
    date: '13/2/1992'
  },
  {
    _id: '2',
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    email: 'test@test.com',
    date: '13/2/1992'
  },
  {
    _id: '3',
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    email: 'test@test.com',
    date: '13/2/1992'
  },
  {
    _id: '4',
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    email: 'test@test.com',
    date: '13/2/1992'
  },
  {
    _id: '5',
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    email: 'test@test.com',
    date: '13/2/1992'
  }
];

const actions = [
  {
    _id: '1',
    date: '29/2/20',
    title: 'Action title',
    description: 'Lorem ipsum dolor sit.',
    author: {
      _id: '5',
      firstName: 'test',
      lastName: 'user',
      password: '1234',
      email: 'test@test.com',
      date: '13/2/1992'
    },
    approved: false
  },
  {
    _id: '2',
    date: '11/5/15',
    title: 'second title',
    description: 'Lorem ipsum dolor sit.',
    author: {
      _id: '1',
      firstName: 'asda',
      lastName: 'user',
      password: '1234',
      email: 'test@test.com',
      date: '13/2/1992'
    },
    approved: true
  }
];

module.exports = {
  Query: {
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
    actions: () => {
      return actions;
    }
  },
  Mutation: {
    createUser: async (root, args, ctx) => {
      const newUser = await new User({
        ...args.user
      }).save();
      return newUser;
    },
    createAction: async (root, args, ctx) => {
      const newAction = await new Action({
        ...args.action,
        author: '5cbe3e00ef90cf692d73c9cf'
      }).save();
      const actionAdded = await User.populate(newAction, 'author');
      return actionAdded;
    }
  }
};
