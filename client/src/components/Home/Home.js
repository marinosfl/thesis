import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Context from '../../context';

import './Home.scss';

export default function Home() {
  const { state } = useContext(Context);

  return (
    <section className="take-part">
      <div className="container take-part__container">
        <p className="take-part__voting">
          Επόμενη Ψηφοφορία:{' '}
          <span className="take-part__countdown">17:05:44</span>
        </p>
        <div>
          <div className="take-part__idea">
            Υπόβαλε την ιδέα σου,
            <span className="take-part__improve">Βελτίωσε τον τοπο σου!</span>
          </div>
          <NavLink
            // if user is logged in redirect him to submit_action, otherwise to /login
            to={state.isAuth ? '/submit_action' : '/login'}
            className="take-part__submit"
          >
            ΥΠΟΒΟΛΗ
          </NavLink>
        </div>
      </div>
    </section>
  );
}
