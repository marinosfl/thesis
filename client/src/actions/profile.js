import { useClient } from '../client';
// import { setAlert } from './alert';

import { UPDATE_PROFILE_MUTATION } from '../graphql/mutations';
import { ME_QUERY } from '../graphql/queries';

import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  const client = useClient();
  try {
    const { me } = await client.request(ME_QUERY);
    dispatch({
      type: GET_PROFILE,
      payload: me
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
      // payload: {
      //   msg: err.response.statusText,
      //   status: err.response.status
      // }
    });
  }
};

export const updateCurrentProfile = props => async dispatch => {
  const client = useClient();

  try {
    const { updateProfile } = await client.request(UPDATE_PROFILE_MUTATION, {
      email: props.userEmail,
      firstName: props.userFirstName,
      lastName: props.userLastName
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: updateProfile
    });
  } catch (err) {
    console.log(err);
  }
};
