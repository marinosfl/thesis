import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

import classNames from 'classnames';
import '../Form.scss';
import './Login.scss';

const Login = ({ login, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

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
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
