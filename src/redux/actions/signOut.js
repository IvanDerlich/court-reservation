import {
  logoutActionCreator,
  errorCleanUpActionCreator,
} from './creators';

const signOutAction = dispatch => {
  dispatch(logoutActionCreator());
  dispatch(errorCleanUpActionCreator());
};

export default signOutAction;
