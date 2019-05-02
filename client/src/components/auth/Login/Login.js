import React, { useState, useContext } from 'react';
import { GraphQLClient } from 'graphql-request';

import { BASE_URL } from '../../../client';
import { LOGIN_QUERY } from '../../../graphql/queries';
import Context from '../../../context';

import classNames from 'classnames';
import '../Form.scss';

export default function Login() {
  const { dispatch } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const client = new GraphQLClient(BASE_URL, {});
      const loginData = await client.request(LOGIN_QUERY, {
        email,
        password
      });
      localStorage.setItem('token', loginData.login.token);
      console.log(loginData.login.currentUser);
      dispatch({
        type: 'LOGIN_USER',
        payload: loginData.login.currentUser
      });
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
        <input type="submit" value="Εγγραφή" className="form__submit" />
      </form>
    </div>
  );
}
