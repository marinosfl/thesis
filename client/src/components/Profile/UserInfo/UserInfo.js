import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateUser } from '../../../actions/auth';

// import classNames from 'classnames';

const UserInfo = ({ user, updateUser }) => {
  const { email, firstName, lastName } = user;

  const [userEmail] = useState(email);
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userLastName, setUserLastName] = useState(lastName);

  const handleSubmit = async event => {
    event.preventDefault();
    updateUser({ userEmail, userFirstName, userLastName });
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
};

UserInfo.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateUser }
)(UserInfo);
