import { combineReducers } from 'redux';

import headers from './headers';
import errors from './errors';
import messages from './messages';
import allCourts from './allCourts';

const rootReducer = combineReducers({
  headers,
  errors,
  messages,
  allCourts,
});

export default rootReducer;
