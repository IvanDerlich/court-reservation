/* eslint-disable camelcase */
import signUpService from '../../services/auth/signUp';
import {
  messageActionCreator,
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
} from '../creators';

const signUpAction = async (dispatch, user, password, first_name, last_name) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  try {
    const response = await signUpService(user, password, first_name, last_name);
    // console.log(response);
    if (response.status === 200) {
      dispatch(
        messageActionCreator('Sign Up successful. Now sign In.'),
      );
    } else {
      throw new Error(['Server returned something different from status OK or code 200']);
    }
  } catch (e) {
    // console.log(e);
    let message = '';
    if (e.response === undefined) {
      message = 'No response from server in Sign Up';
    } else {
      message = e.message;
    }
    return message;
  }
  return null;
};

export default signUpAction;
