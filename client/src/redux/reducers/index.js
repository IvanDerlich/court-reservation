import { combineReducers } from 'redux';

import headers from './headers';
import errors from './errors';
import messages from './messages';
import allCourts from './allCourts';
import myCourts from './myCourts';
import bookingsOnMyCourts from './bookingsOnMyCourts';
import bookingsMine from './bookingsMine';

const rootReducer = combineReducers({
  headers,
  errors,
  messages,
  allCourts,
  myCourts,
  bookingsOnMyCourts,
  bookingsMine,
});

export default rootReducer;
