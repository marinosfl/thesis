const mongoose = require('mongoose');

const User = require('./models/User');

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

module.exports = {
  Query: {
    user: async (root, args, ctx) => {
      const [user] = await users.filter(user => {
        if (args._id === user._id) {
          return user;
        }
      });
      return user;
    },
    users: () => {
      return users;
    }
  }
};
