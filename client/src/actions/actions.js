import { GraphQLClient } from 'graphql-request';

import { LOAD_ACTIONS, LOAD_ACTION, CREATE_ACTION } from './types';
import { LOAD_ACTIONS_QUERY, LOAD_ACTION_QUERY } from '../graphql/queries';
import { CREATE_ACTION_MUTATION } from '../graphql/mutations';
import { BASE_URL, useClient } from '../client';

// Load all actions
export const loadActions = authorId => async dispatch => {
  const client = new GraphQLClient(BASE_URL, {});

  try {
    const { actions } = await client.request(LOAD_ACTIONS_QUERY, { authorId });
    dispatch({
      type: LOAD_ACTIONS,
      payload: actions
    });
  } catch (err) {
    console.log(err);
  }
};

// Load one action based on id
export const loadAction = id => async dispatch => {
  const client = new GraphQLClient(BASE_URL, {});

  try {
    const { action } = await client.request(LOAD_ACTION_QUERY, {
      id
    });
    dispatch({
      type: LOAD_ACTION,
      payload: action
    });
  } catch (err) {
    console.log(err);
  }
};

// Create new action
export const createAction = data => async dispatch => {
  const client = useClient();
  // const {title, description, latitude, longitude} = data;
  try {
    const { createAction } = await client.request(CREATE_ACTION_MUTATION, {
      ...data
    });

    dispatch({
      type: CREATE_ACTION,
      payload: createAction
    });
  } catch (err) {
    console.log(err);
  }
};
