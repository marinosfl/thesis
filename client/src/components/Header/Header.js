import React, { useEffect, useContext } from 'react';
import { GraphQLClient } from 'graphql-request';

import Navbar from '../Navbar/Navbar';

import { BASE_URL } from '../../client';
import { ME_QUERY } from '../../graphql/queries';
import Context from '../../context';

import './Header.scss';

export default function Header() {
  const { dispatch } = useContext(Context);
  // const client = useClient();

  useEffect(() => {
    getStoredUser();
  }, []);

  const getStoredUser = async () => {
    const client = new GraphQLClient(BASE_URL, {
      headers: { authorization: localStorage.getItem('token') }
    });

    const { me } = await client.request(ME_QUERY);
    dispatch({ type: 'LOGIN_USER', payload: me });
  };

  return (
    <header className="header">
      <Navbar />
    </header>
  );
}
