export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      let isAuth = false;

      if (payload) {
        isAuth = true;
      }

      console.log(payload);
      return {
        ...state,
        currentUser: payload,
        isAuth
      };
    case 'LOGOUT_USER':
      localStorage.setItem('token', '');
      return {
        ...state,
        currentUser: payload
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        currentUser: payload
      };
    default:
      return state;
  }
}
