/* eslint-disable no-return-await */
import axios from 'axios';

export default async function login(email, password) {
  let URL = '';

  // const CORSproxyURL = 'https://frozen-lake-26505.herokuapp.com/';
  // const CORSproxyURL = 'https://glacial-island-44066.herokuapp.com/'
  // URL += CORSproxyURL;

  const APIserverBaseURL = 'http://127.0.0.1:3000';
  URL += APIserverBaseURL;

  const APIserverResource = '/api/v1/auth/sign_in?';
  URL += APIserverResource;

  const emailURL = `email=${email}`;
  URL += emailURL;

  const passwordURL = `&password=${password}`;
  URL += passwordURL;

  return axios.post(URL);
}
