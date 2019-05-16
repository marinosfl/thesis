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
      // if current action is null load the latest action
      const currentAction = currentAction ? currentAction : payload[0];

      return {
        ...state,
        actions: payload,
        currentAction,
        loading: false
      };
    case LOAD_ACTION:
      return {
        ...state,
        currentAction: payload
      };
    default:
      return state;
  }
}
