import axios from 'axios';
import { MY_COURTS_ENDPOINT } from '../../URLs';

const getMyCourtsService = headers => {
  const config = {
    headers,
  };

  const response = axios.get(
    `${MY_COURTS_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getMyCourtsService;
