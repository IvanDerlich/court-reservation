/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import axios from 'axios';
import { SIGN_UP_ENDPOINT } from '../URLs';

export default function signUpService(email, password, first_name, last_name) {
  const data = {
    email,
    password,
    first_name,
    last_name,
  };
  // console.log(data);
  return axios.post(SIGN_UP_ENDPOINT, data);
}
