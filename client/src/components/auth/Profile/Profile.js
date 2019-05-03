import React, { useState, useEffect, useContext } from 'react';

import Context from '../../../context';
// import classNames from 'classnames';
import { GraphQLClient } from 'graphql-request';

import { BASE_URL } from '../../../client';
import { ME_ACTIONS_QUERY } from '../../../graphql/queries';
import { UPDATE_PROFILE_MUTATION } from '../../../graphql/mutations';

import '../Form.scss';
import './Profile.scss';

const initialState = {
  email: '',
  firstName: '',
  lastName: ''
};

export default function Profile() {
  const { state, dispatch } = useContext(Context);
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.currentUser) {
      setIsLoading(false);
      const { currentUser } = state;
      initialState.email = currentUser.email;
      initialState.firstName = currentUser.firstName
        ? currentUser.firstName
        : '';
      initialState.lastName = currentUser.lastName ? currentUser.lastName : '';

      setForm(initialState);
    }
  }, [state.currentUser]);

  useEffect(() => {
    if (state.currentUser) {
      fetchActions();
      console.log(state.currentUser);
    }
  }, [state.currentUser]);

  const fetchActions = async () => {
    try {
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: localStorage.getItem('token') }
      });

      const actions = await client.request(ME_ACTIONS_QUERY, {
        authorId: state.currentUser._id
      });
      console.log(actions);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_PROFILE', payload: form });

    try {
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: localStorage.getItem('token') }
      });
      const updated = await client.request(UPDATE_PROFILE_MUTATION, {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        'Loading'
      ) : (
        <form className="form form__signup" onSubmit={handleSubmit}>
          <h2 className="section--title form--title">Προφίλ</h2>
          <div className="form__input--wrapper">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form__input"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              disabled
            />
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="firstName">Όνομα</label>
            <input
              type="firstName"
              className="form__input"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={form.firstName}
            />
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="lastName">Επώνυμο</label>
            <input
              type="lastName"
              className="form__input"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={form.lastName}
            />
          </div>

          <input type="submit" value="Εγγραφή" className="form__submit" />
        </form>
      )}
    </div>
  );
}
