import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';

import classNames from 'classnames';
import '../Form.scss';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (password && password2 && password !== password2) {
      setIsError(true);
      props.setAlert('passwords do not match', 'error');
    } else {
      setIsError(false);
    }
  }, [password, password2]);

  const handleSubmit = async event => {
    event.preventDefault();

    // Validating password and password2 are the same
    if (password && password === password2 && email) {
      props.register({ email, password });

      // Redirect user on home page after login
      props.history.push('/');
    } else {
      setAlert('passwords do not match', 'error');
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <form className="form form__signup" onSubmit={handleSubmit}>
        <h2 className="section--title form--title">Εγγραφή</h2>
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
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Signup);
