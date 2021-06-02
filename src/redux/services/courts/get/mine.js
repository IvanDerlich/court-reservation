import axios from 'axios';
import { MY_COURTS_ENDPOINT } from '../../URLs';

const getMyCourtsService = headers => {
  const config = {
    headers,
  };

  const response = axios.get(
    // Improve this code: There has to be a way to send a params object
    `${MY_COURTS_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getMyCourtsService;
