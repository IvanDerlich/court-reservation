import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
// import loadState from './dispatchers/loadState';
// import {
  // eslint-disable-next-line no-unused-vars
  // offlineFetching,
  // eslint-disable-next-line no-unused-vars
  //  apiFetching,
// } from './dispatchers/actionCreators';

const options = {
  trace: true,
  traceLimit: 10,
};
const composedEnhancers = composeWithDevTools(options);

const store = createStore(rootReducer, composedEnhancers(applyMiddleware(thunkMiddleware)));

// store.dispatch(offlineFetching());
// store.dispatch(apiFetching());
// store.dispatch(loadState);
export default store;