import { createContext } from 'react';

const Context = createContext({
  isAuth: false,
  currentUser: null
});

export default Context;
