import axios from 'axios';
import { getMyCourtsEnpoint } from '../../URLs';

const getMyCourtsService = headers => {
  // extract user id from headers
  console.log(headers);
  const endpoint = getMyCourtsEnpoint(headers.uid);
  console.log(endpoint);
  // return courtId;
  const response = axios.get(endpoint, { headers });
  return response;
};

export default getMyCourtsService;
