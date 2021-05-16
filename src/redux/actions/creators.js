import {
  LOGGED_IN,
  LOGGED_OUT,
  ADD_ERROR,
  CLEAN_ERRORS,
  ADD_MESSAGE,
  CLEAN_MESSAGES,
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

export const messageActionCreator = message => ({
  type: ADD_MESSAGE,
  payload: {
    message,
  },
});

export const messagesCleanUpActionCreator = () => ({
  type: CLEAN_MESSAGES,
});
