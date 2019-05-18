const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
// const jwt = require('jsonwebtoken');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const isAuth = require('./middleware/isAuth');

// const User = require('./models/User');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return isAuth(req);
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
