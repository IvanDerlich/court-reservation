import {
  LOGGED_IN,
  LOGGED_OUT,
} from '../actionTypes';

const headers = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return action.payload.headers;
    case LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

export default headers;
