import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Error from '../../Error/Error';
import Label from '../Label/Label';

import { register } from '../../../actions/auth';

import '../Form.scss';
import './Signup.scss';

const Signup = ({ register, isAuthenticated, errors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [password2Focus, setPassword2Focus] = useState(false);

  useEffect(() => {
    if (password && password2 && password !== password2) {
    } else {
    }
  }, [password, password2]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Validating password and password2 are the same
    if (password && password === password2 && email) {
      register({ email, password });
    } else {
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <form className="form form__signup" onSubmit={handleSubmit}>
        <h2 className="section--title form--title">Εγγραφή</h2>
        <div className="form__input--wrapper">
          <input
            type="email"
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
        <div className="form__input--wrapper">
          <input
            type="password"
            className="form__input"
            id="password2"
            onChange={event => setPassword2(event.target.value)}
            onFocus={() => setPassword2Focus(true)}
            onBlur={event => !event.target.value && setPassword2Focus(false)}
            value={password2}
          />
          <Label
            isFocused={password2Focus}
            input={'password2'}
            name={'Επαλήθευση κωδικού'}
          />
        </div>
        {errors && <Error errors={errors} />}
        <input type="submit" value="Εγγραφή" className="form__submit" />
      </form>
    </div>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { register }
)(Signup);
