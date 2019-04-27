import React, { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

import { BASE_URL } from '../../client';
import { CREATE_USER_MUTATION } from '../../graphql/mutations';

import classNames from 'classnames';
import './Signup.scss';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (password && password2 && password !== password2) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [password, password2]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Validating password and password2 are the same
    if (password === password2 && email) {
      const user = setUser({ email, password });
    }
    const client = new GraphQLClient(BASE_URL, {});
    const user = await client.request(CREATE_USER_MUTATION, {
      email,
      password
    });
    console.log(user);
  };

  return (
    <div className="container">
      <form className="form form__signup" onSubmit={handleSubmit}>
        <h2 className="section--title form--title">Εγγραφή</h2>
        <div className="form__input--wrapper">
          <label htmlFor="firstName">E-mail</label>
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
        <div className="form__input--wrapper">
          <label htmlFor="password2">Επαλήθευση κωδικού</label>
          <input
            type="password"
            className="form__input"
            id="password2"
            onChange={event => setPassword2(event.target.value)}
            value={password2}
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
