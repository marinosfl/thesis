import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GraphQLClient } from 'graphql-request';

import { BASE_URL } from '../../../client';
import { LOGIN_QUERY } from '../../../graphql/queries';
import Context from '../../../context';

import classNames from 'classnames';
import '../Form.scss';
import './Login.scss';

export default function Login(props) {
  const { dispatch } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const client = new GraphQLClient(BASE_URL, {});
      const loginData = await client.request(LOGIN_QUERY, {
        email,
        password
      });
      // saving jwt token @localStorage
      localStorage.setItem('token', loginData.login.token);
      // Setting up the data of currentUser @global Context state
      dispatch({
        type: 'LOGIN_USER',
        payload: loginData.login.currentUser
      });

      // Redirect user on home page after login
      props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form className="form form__signup" onSubmit={handleSubmit}>
        <h2 className="section--title form--title">Σύνδεση</h2>
        <div className="form__input--wrapper">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form__input"
            id="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="password">Κωδικός</label>
          <input
            type="password"
            className="form__input"
            id="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <span
            className={classNames(
              {
                block: isError
              },
              'error'
            )}
          >
            Οι κωδικοί δεν ταιριάζουν
          </span>
        </div>
        <input type="submit" value="Σύνδεση" className="form__submit" />
      </form>
      <p className="link-to-signup">
        Δέν έχετε λογαριασμό; <NavLink to="/signup">Εγγραφείτε</NavLink>
      </p>
    </div>
  );
}
