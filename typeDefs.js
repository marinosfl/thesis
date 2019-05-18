const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    date: String
    actions: [Action!]
    role: String
  }

  type Action {
    _id: ID
    date: String
    title: String
    description: String
    author: User
    approved: Boolean
    latitude: Float
    longitude: Float
    start_date: String
    end_date: String
    status: String
    votes: Int
  }

  type Token {
    token: String!
  }

  type Query {
    user(_id: ID!): User
    users: [User!]
    action(_id: ID!): Action
    actions(authorId: ID): [Action!]
    login(email: String!, password: String!): Token
    me: User
    meActions(authorId: ID!): [Action!]
  }

  input RegisterInput {
    email: String
    password: String
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    email: String
  }

  input CreateActionInput {
    title: String
    description: String
    latitude: Float
    longitude: Float
  }

  type Mutation {
    register(user: RegisterInput!): Token
    updateProfile(profileData: UpdateProfileInput!): User
    createAction(action: CreateActionInput): Action
  }
`;
