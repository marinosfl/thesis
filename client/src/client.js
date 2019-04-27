export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '<insert-production-url>'
    : 'http://localhost:4000/graphql';
