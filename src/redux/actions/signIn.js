import signInService from '../services/auth/signIn';
// import {
//   LOGGED_IN,
//   LOGGED_OUT,
// } from '../actionTypes';

const signInAction = (dispatch, user, password) => {
  // calls axios to login
  // in the .then section, set the variable success and dispatch actions
  // all code bellow goes tinside the .then procedure
  // clears the error messages in the store state
  signInService(user, password)
    .then(response => {
      console.log(response);
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
    })
    .catch(error => {
      // handle error
      console.log(error);
      // stores the state the error message
    });
};

export default signInAction;
