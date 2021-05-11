import { LOGGED_IN, LOGGED_OUT } from '../actionTypes';

export const loginActionCreator = headers => ({
  type: LOGGED_IN,
  payload: { headers },
});

export const logoutActionCreator = () => ({
  type: LOGGED_OUT,
  payload: {
    headers: null,
  },
});
