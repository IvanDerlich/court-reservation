import { combineReducers } from 'redux';

import headers from './headers';
import errors from './errors';

const rootReducer = combineReducers({
  headers,
  errors,
});

export default rootReducer;
