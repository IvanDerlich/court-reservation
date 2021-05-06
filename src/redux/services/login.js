/* eslint-disable no-return-await */
import axios from 'axios';
import { AUTH_ENDPOINT } from './URLs';

export default function login(email, password) {
  const data = {
    email,
    password,
  };

  return axios.post(AUTH_ENDPOINT, data);
}
