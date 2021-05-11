import signInService from '../services/auth/signIn';
import { loginActionCreator, logoutActionCreator } from './creators';

const signInAction = async (dispatch, user, password) => {
  // calls axios to login
  // in the .then section, set the variable success and dispatch actions
  // all code bellow goes tinside the .then procedure
  // clears the error messages in the store state
  console.log('a');
  const response = await signInService(user, password)
  console.log(response);
  const headers = {
    'access-token': response.headers['access-token'],
  };
  console.log(headers);


  // const success = true;
  // let headers = {};
  // switch (success) {
  //   case true:
  //     headers = { asdf: 'adsfdas' };
  //     return dispatch({
  //       type: LOGGED_IN,
  //       payload: { headers },
  //     });
  //   case false:
  //     return dispatch({
  //       type: LOGGED_OUT,
  //       payload: {},
  //     });
  //   default:
  //     return false;
  // }
};

export default signInAction;
