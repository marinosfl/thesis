import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <>
      {user && user.role === 'admin' ? (
        <NavLink to="/dashboard" className="navbar__menu-item">
          Dashboard
        </NavLink>
      ) : (
        ''
      )}
      <NavLink to="/profile" className="navbar__menu-item">
        {user ? user.firstName : 'Προφίλ'}
      </NavLink>
      <NavLink to="/" className="navbar__menu-item" onClick={logout}>
        Αποσύνδεση
      </NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink to="/signup" className="navbar__menu-item navbar__signup">
        Εγγραφή
      </NavLink>
      <NavLink to="/login" className="navbar__menu-item">
        Σύνδεση
      </NavLink>
    </>
  );

  return (
    <nav className="navbar container">
      <div className="navbar__menu">
        <NavLink className="navbar__menu-item" to="/">
          Αρχική
        </NavLink>
        <NavLink className="navbar__menu-item" to="/">
          Συχνές Ερωτήσεις
        </NavLink>
        <NavLink className="navbar__menu-item" to="/">
          Νέα - Ανακοινώσεις
        </NavLink>
      </div>

      <div className="navbar__menu">
        {!loading && <> {isAuthenticated ? authLinks : guestLinks} </>}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
