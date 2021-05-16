/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import axios from 'axios';
import { SIGN_UP_ENDPOINT } from '../URLs';

export default function signUpService(email, password, first_name, last_name) {
  console.log(first_name, ' First name in service');
  const data = {
    email,
    password,
    first_name,
    last_name,
  };
  console.log(data);

  return axios.post(SIGN_UP_ENDPOINT, data);
}

// See if I can check input types with proptypes in the future
