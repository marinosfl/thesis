import { GraphQLClient } from 'graphql-request';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_PROFILE
} from './types';
import { BASE_URL } from '../client';
import {
  CREATE_USER_MUTATION,
  UPDATE_PROFILE_MUTATION
} from '../graphql/mutations';
import { ME_QUERY, LOGIN_QUERY } from '../graphql/queries';
import { useClient } from '../client';
// import { setAlert } from './alert';

// Load User
export const loadUser = () => async dispatch => {
  const client = useClient();

  try {
    const { me } = await client.request(ME_QUERY);
    dispatch({
      type: USER_LOADER,
      payload: me
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const updateUser = props => async dispatch => {
  const client = useClient();
  console.log(props);
  const { userEmail, userFirstName, userLastName } = props;
  try {
    const { updateProfile } = await client.request(UPDATE_PROFILE_MUTATION, {
      email: userEmail,
      firstName: userFirstName,
      lastName: userLastName
    });
    console.log(updateProfile);
    dispatch({
      type: UPDATE_PROFILE,
      payload: updateProfile
    });
  } catch (err) {
    console.log(err);
  }
};

// Register User
export const register = ({ email, password }) => async dispatch => {
  const client = new GraphQLClient(BASE_URL, {});
  try {
    const { register } = await client.request(CREATE_USER_MUTATION, {
      email,
      password
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: register
    });
    dispatch(loadUser());
  } catch (err) {
    // console.log(err.response.errors.message);
    // const errors = err.response.data.errors;
    console.log(err);
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(err.msg, 'error')));
    // }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const client = new GraphQLClient(BASE_URL, {});
  try {
    const { login } = await client.request(LOGIN_QUERY, {
      email,
      password
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: login
    });

    dispatch(loadUser());
  } catch (err) {
    // console.log(err.response.errors.message);
    // const errors = err.response.data.errors;
    console.log(err);
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(err.msg, 'error')));
    // }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
