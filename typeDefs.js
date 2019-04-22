const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    date: String
  }

  type Action {
    _id: ID
    date: String
    title: String
    description: String
    author: User
    approved: Boolean
  }

  type Query {
    user(_id: ID!): User
    users: [User!]
    action(_id: ID!): Action
    actions: [Action!]
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input CreateActionInput {
    title: String
    description: String
  }

  type Mutation {
    createUser(user: CreateUserInput!): User
    createAction(action: CreateActionInput): Action
  }
`;
