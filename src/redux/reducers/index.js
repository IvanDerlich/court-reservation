import { combineReducers } from 'redux';

import headers from './headers';
import errors from './errors';
import messages from './messages';

const rootReducer = combineReducers({
  headers,
  errors,
  messages,
});

export default rootReducer;
