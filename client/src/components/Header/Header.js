import React, { useEffect, useContext } from 'react';

import Navbar from '../Navbar/Navbar';

import { useClient } from '../../client';
import { ME_QUERY } from '../../graphql/queries';
import Context from '../../context';

import './Header.scss';

export default function Header() {
  const client = useClient();
  const { dispatch } = useContext(Context);

  useEffect(() => {
    getStoredUser();
  }, []);

  const getStoredUser = async () => {
    const { me } = await client.request(ME_QUERY);
    dispatch({ type: 'LOGIN_USER', payload: me });
  };

  return (
    <header className="header">
      <Navbar />
    </header>
  );
}
