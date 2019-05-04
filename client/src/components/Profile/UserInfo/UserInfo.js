import React, { useState, useContext } from 'react';
import Context from '../../../context';
// import classNames from 'classnames';

import { useClient } from '../../../client';
import { UPDATE_PROFILE_MUTATION } from '../../../graphql/mutations';

export default function UserInfo({ user }) {
  const client = useClient();
  const { dispatch } = useContext(Context);

  const { email, firstName, lastName } = user;

  const [userEmail] = useState(email);
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userLastName, setUserLastName] = useState(lastName);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const { updateProfile } = await client.request(UPDATE_PROFILE_MUTATION, {
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName
      });

      dispatch({ type: 'UPDATE_PROFILE', payload: updateProfile });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form form__signup" onSubmit={handleSubmit}>
        <h2 className="section--title form--title">Προφίλ</h2>
        <div className="form__input--wrapper">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form__input"
            id="email"
            name="email"
            value={userEmail}
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
            onChange={event => setUserFirstName(event.target.value)}
            value={userFirstName}
          />
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="lastName">Επώνυμο</label>
          <input
            type="lastName"
            className="form__input"
            id="lastName"
            name="lastName"
            onChange={event => setUserLastName(event.target.value)}
            value={userLastName}
          />
        </div>
        <input type="submit" value="Αποθήκευση" className="form__submit" />
      </form>
    </>
  );
}
