import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

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
