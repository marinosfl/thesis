import React from 'react';

import './Signup.scss';

export default function Signup() {
  return (
    <div className="container">
      <form className="form form__signup">
        <h2 className="section--title form--title">Εγγραφή</h2>
        <div className="form__input--wrapper">
          <label htmlFor="firstName">E-mail</label>
          <input type="email" className="form__input" id="email" />
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="password">Κωδικός</label>
          <input type="password" className="form__input" id="password" />
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="password2">Επαλήθευση κωδικού</label>
          <input type="password" className="form__input" id="password2" />
        </div>
        <input type="submit" value="Εγγραφή" className="form__submit" />
      </form>
    </div>
  );
}
