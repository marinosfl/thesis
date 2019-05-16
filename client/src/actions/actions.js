import { GraphQLClient } from 'graphql-request';

import { LOAD_ACTIONS, LOAD_ACTION } from './types';
import { LOAD_ACTIONS_QUERY } from '../graphql/queries';
import { BASE_URL } from '../client';

// Load all actions
export const loadActions = () => async dispatch => {
  const client = new GraphQLClient(BASE_URL, {});

  try {
    const { actions } = await client.request(LOAD_ACTIONS_QUERY);
    dispatch({
      type: LOAD_ACTIONS,
      payload: actions
    });
  } catch (err) {
    console.log(err);
  }
};
