import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import './Navbar.scss';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

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
        {!isLogged ? (
          <>
            <NavLink to="/signup" className="navbar__menu-item navbar__signup">
              Εγγραφή
            </NavLink>
            <NavLink to="/login" className="navbar__menu-item">
              Σύνδεση
            </NavLink>
          </>
        ) : (
          <NavLink to="/" className="navbar__menu-item">
            Προφίλ
          </NavLink>
        )}
      </div>
    </nav>
  );
}
