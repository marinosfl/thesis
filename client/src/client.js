import { GraphQLClient } from 'graphql-request';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '<insert-production-url>'
    : 'http://localhost:4000/graphql';

export const useClient = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return new GraphQLClient(BASE_URL, {
      headers: { authorization: token }
    });
  }
};
