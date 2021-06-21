import axios from 'axios';
import { COURTS_ENDPOINT } from '../../URLs';

const getMyCourtsService = headers => {
  const config = {
    headers,
  };

  const response = axios.get(
    `${COURTS_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getMyCourtsService;
