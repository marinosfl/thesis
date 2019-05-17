import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from '../Map/Map';

import { createAction } from '../../actions/actions';

import '../auth/Form.scss';
import './ActionForm.scss';

const ActionForm = ({ createAction }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [terms, setTerms] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    if (title && description && terms) {
      const data = {
        title,
        description,
        latitude,
        longitude
      };
      createAction(data);
    }
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;

    const longitude = lngLat[0];
    const latitude = lngLat[1];

    setLatitude(latitude);
    setLongitude(longitude);
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

          <Map
            handleClick={handleMapClick}
            latitude={latitude}
            longitude={longitude}
          />

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
};

// mapStateToProps = state => {}
ActionForm.propTypes = {
  createAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { createAction }
)(ActionForm);
