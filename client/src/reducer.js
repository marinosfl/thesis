export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      };
    case 'LOGOUT_USER':
      localStorage.setItem('token', '');
      return {
        ...state,
        currentUser: payload
      };
    case 'UPDATE_PROFILE':
      console.log('reducer', payload);
      return {
        ...state,
        currentUser: payload
      };
    default:
      return state;
  }
}
