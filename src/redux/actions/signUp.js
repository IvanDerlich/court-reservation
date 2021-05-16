/* eslint-disable camelcase */
import signUpService from '../services/auth/signUp';
import {
  errorCleanUpActionCreator,
  errorMessageActionCreator,
  messageActionCreator,
  messagesCleanUpActionCreator,
} from './creators';

const signUpAction = async (dispatch, user, password, first_name, last_name) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  try {
    const response = await signUpService(user, password, first_name, last_name);
    if (response.status === 200) {
      dispatch(
        messageActionCreator('Sign Up successful. Now sign In.'),
      );
      return response.status;
    }
    throw new Error(['Server returned something different from status OK or code 200']);
  } catch (e) {
    // console.log(e.response);
    let message = '';
    if (e.response === undefined) {
      message = 'No response from server in Sign Up';
      return e.response.status;
    }
    message = e.message;
    dispatch(
      errorMessageActionCreator(message),
    );
    return e;
  }
};

export default signUpAction;
