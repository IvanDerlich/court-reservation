import {
  LOGGED_IN,
  LOGGED_OUT,
  ADD_ERROR,
  CLEAN_ERRORS,
} from '../actionTypes';

export const loginActionCreator = headers => ({
  type: LOGGED_IN,
  payload: { headers },
});

export const logoutActionCreator = () => ({
  type: LOGGED_OUT,
});

export const errorMessageActionCreator = errorMessage => ({
  type: ADD_ERROR,
  payload: {
    errorMessage,
  },
});

export const errorCleanUpActionCreator = () => ({
  type: CLEAN_ERRORS,
});
