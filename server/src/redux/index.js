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

// eslint-disable-next-line import/first
import login from './actions/auth/signIn';

login(store.dispatch, 'ivan@ivan.com', '12345678');

export default store;
