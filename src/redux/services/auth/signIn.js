/* eslint-disable no-return-await */
import axios from 'axios';
import { SIGN_IN_ENDPOINT } from '../URLs';

const signInService = (email, password) => {
  const data = {
    email,
    password,
  };
  return axios.post(SIGN_IN_ENDPOINT, data);
};

export default signInService;
