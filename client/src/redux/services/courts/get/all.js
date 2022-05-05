/* eslint-disable no-return-await */
import axios from 'axios';
import { COURTS_ENDPOINT } from '../../URLs';

const getAllCourtsService = headers => {
  // console.log(COURTS_ENDPOINT);
  const response = axios.get(COURTS_ENDPOINT, { headers });
  // console.log(response, 'response');
  return response;
};

export default getAllCourtsService;
