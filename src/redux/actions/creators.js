import {
  LOGGED_IN,
  LOGGED_OUT,
  ADD_ERROR,
  CLEAN_ERRORS,
  ADD_MESSAGE,
  CLEAN_MESSAGES,
  LOAD_ALL_COURTS,
  LOAD_MY_COURTS,
  LOAD_BOOKINGS_ON_MY_COURTS,
  LOAD_MY_BOOKINGS,
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
  payload: { errorMessage },
});

export const errorCleanUpActionCreator = () => ({
  type: CLEAN_ERRORS,
});

export const messageActionCreator = message => ({
  type: ADD_MESSAGE,
  payload: { message },
});

export const messagesCleanUpActionCreator = () => ({
  type: CLEAN_MESSAGES,
});

export const loadAllCourts = allCourts => ({
  type: LOAD_ALL_COURTS,
  payload: { allCourts },
});

export const loadMyCourts = myCourts => ({
  type: LOAD_MY_COURTS,
  payload: { myCourts },
});

export const loadBookingsOnMyCourts = bookingsOnMyCourts => ({
  type: LOAD_BOOKINGS_ON_MY_COURTS,
  payload: { bookingsOnMyCourts },
});

export const loadBookingsMine = bookingsMine => ({
  type: LOAD_MY_BOOKINGS,
  payload: { bookingsMine },
});
