import React, { useState } from 'react';

import { useClient } from '../../client';
import { CREATE_ACTION_MUTATION } from '../../graphql/mutations';

import '../auth/Form.scss';
import './ActionForm.scss';

export default function ActionForm() {
  const client = useClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (title && description && terms) {
      await client.request(CREATE_ACTION_MUTATION, {
        title,
        description
      });
    }
  };

  return (
    <section className="action__form">
      <div className="container">
        <form className="form form__new-action" onSubmit={handleSubmit}>
          <h2 className="section--title form--title">Υπόβαλε την ιδέα σου</h2>

          <div className="form__input--wrapper">
            <label htmlFor="title">Τίτλος</label>
            <input
              type="text"
              className="form__input"
              id="title"
              onChange={event => setTitle(event.target.value)}
              value={title}
            />
          </div>

          <div className="form__input--wrapper">
            <label htmlFor="description">Περιγραγή</label>
            <textarea
              className="form__input"
              id="description"
              onChange={event => setDescription(event.target.value)}
              value={description}
            />
          </div>

          <div className="form__input--wrapper">
            <label htmlFor="title">Αποδοχή Προϋποθέσεων & Όρων χρήσης</label>
            <input
              type="checkbox"
              className="form__input"
              id="terms"
              onChange={event => setTerms(!terms)}
            />
          </div>
          <input type="submit" value="Υποβολή" className="form__submit" />
        </form>
      </div>
    </section>
  );
}
