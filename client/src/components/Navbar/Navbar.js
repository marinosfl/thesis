import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import Context from '../../context';

import './Navbar.scss';

export default function Navbar() {
  const { state, dispatch } = useContext(Context);

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
        {!state.currentUser ? (
          <>
            <NavLink to="/signup" className="navbar__menu-item navbar__signup">
              Εγγραφή
            </NavLink>
            <NavLink to="/login" className="navbar__menu-item">
              Σύνδεση
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/profile" className="navbar__menu-item">
              {state.currentUser.firstName
                ? state.currentUser.firstName
                : 'Προφίλ'}
            </NavLink>
            <NavLink
              to="/"
              className="navbar__menu-item"
              onClick={() => {
                dispatch({ type: 'LOGOUT_USER', payload: null });
              }}
            >
              Αποσύνδεση
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
