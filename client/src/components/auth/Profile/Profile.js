import React, { useState, useEffect, useContext } from 'react';

import Context from '../../../context';
import classNames from 'classnames';

import '../Form.scss';
import './Profile.scss';

export default function Profile() {
  const { state } = useContext(Context);
  // const { currentUser } = state;
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.currentUser) {
      setIsLoading(false);
      const { currentUser } = state;
      // Initializing password and password2 as empty strings
      currentUser.password = '';
      currentUser.password2 = '';

      // Eliminatin error that occurs when input is null
      for (let value in currentUser) {
        if (!currentUser[value]) {
          currentUser[value] = '';
        }
      }

      setForm(currentUser);
    }
  }, [state.currentUser]);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {};

  return (
    <div className="container">
      {isLoading ? (
        'Loading'
      ) : (
        <form className="form form__signup" onSubmit={handleSubmit}>
          <h2 className="section--title form--title">Προφίλ</h2>
          <div className="form__input--wrapper">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form__input"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              disabled
            />
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="firstName">Όνομα</label>
            <input
              type="firstName"
              className="form__input"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={form.firstName}
            />
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="lastName">Επώνυμο</label>
            <input
              type="lastName"
              className="form__input"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={form.lastName}
            />
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="password">Κωδικός</label>
            <input
              type="password"
              className="form__input"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
            {/* <span
            className={classNames(
              {
                block: isError
              },
              'error'
            )}
          >
            Οι κωδικοί δεν ταιριάζουν
          </span> */}
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="password2">Επαλήθευση κωδικού</label>
            <input
              type="password"
              className="form__input"
              id="password2"
              name="password2"
              onChange={handleChange}
              value={form.password2}
            />
            {/* <span
            className={classNames(
              {
                block: isError
              },
              'error'
            )}
          >
            Οι κωδικοί δεν ταιριάζουν
          </span> */}
          </div>
          <input type="submit" value="Εγγραφή" className="form__submit" />
        </form>
      )}
    </div>
    // <div className="container">
    //   <div className="firstName">
    //     {currentUser ? currentUser.firstName : ''}
    //     {currentUser ? currentUser.email : ''}
    //   </div>
    // </div>
  );
}
