import { LOAD_ACTIONS, LOAD_ACTION } from '../actions/types';

const initialState = {
  actions: [],
  currentAction: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ACTIONS:
      return {
        ...state,
        actions: payload,
        loading: false
      };
    default:
      return state;
  }
}
