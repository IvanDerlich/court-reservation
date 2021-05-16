import signInService from '../../services/auth/signIn';
import {
  loginActionCreator,
  errorMessageActionCreator,
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
} from '../creators';

const signInAction = async (dispatch, user, password) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(errorCleanUpActionCreator());
  try {
    const response = await signInService(user, password);
    if (response.status === 200) {
      const headers = {
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        uid: response.headers.uid,
      };
      dispatch(loginActionCreator(headers));
      dispatch(errorCleanUpActionCreator());
      dispatch(messagesCleanUpActionCreator());
    } else {
      throw new Error(['Server returned something different from status OK or code 200']);
    }
  } catch (e) {
    let message = '';
    if (e.response === undefined) {
      message = 'No response from server in Sign In';
    } else if (e.response.status === 401) {
      message = 'Wrong credentials';
    } else {
      message = e.message;
    }
    dispatch(
      errorMessageActionCreator(message),
    );
  }
};

export default signInAction;
