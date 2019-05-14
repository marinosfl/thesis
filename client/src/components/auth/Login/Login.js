import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';
import Error from '../../Error/Error';
import Label from '../Label/Label';

import '../Form.scss';
import './Login.scss';

const Login = ({ login, isAuthenticated, errors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

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
          {/* <label htmlFor="email">E-mail</label> */}
          <input
            type="text"
            className="form__input"
            id="email"
            onChange={event => setEmail(event.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={event => !event.target.value && setEmailFocus(false)}
            value={email}
          />
          <Label isFocused={emailFocus} input={'email'} name={'E-mail'} />
        </div>
        <div className="form__input--wrapper">
          {/* <label htmlFor="password">Κωδικός</label> */}
          <input
            type="password"
            className="form__input"
            id="password"
            onChange={event => setPassword(event.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={event => !event.target.value && setPasswordFocus(false)}
            value={password}
          />
          <Label
            isFocused={passwordFocus}
            input={'password'}
            name={'Κωδικός'}
          />
        </div>
        {errors && <Error errors={errors} />}
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
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
