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

  type AuthData {
    token: String!
    tokenExpiration: Int!
    currentUser: User!
  }

  type Query {
    user(_id: ID!): User
    users: [User!]
    action(_id: ID!): Action
    actions: [Action!]
    login(email: String!, password: String!): AuthData
    me: User
  }

  input RegisterInput {
    email: String
    password: String
  }

  input CreateActionInput {
    title: String
    description: String
  }

  type Mutation {
    register(user: RegisterInput!): User
    createAction(action: CreateActionInput): Action
  }
`;
