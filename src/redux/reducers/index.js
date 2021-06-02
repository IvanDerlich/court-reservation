import { combineReducers } from 'redux';

import headers from './headers';
import errors from './errors';
import messages from './messages';
import allCourts from './allCourts';
import myCourts from './myCourts';

const rootReducer = combineReducers({
  headers,
  errors,
  messages,
  allCourts,
  myCourts,
});

export default rootReducer;
