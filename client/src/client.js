import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '<insert-production-url>'
    : 'http://localhost:4000/graphql';

export const useClient = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    setIdToken(token);
  }, []);
  console.log(idToken);
  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken }
  });
};
