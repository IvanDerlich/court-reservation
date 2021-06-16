import axios from 'axios';
import { DELETE_COURT_ENDPOINT } from '../URLs';

const deleteCourtService = (headers, courtId) => {
  const config = {
    headers,
  };

  const response = axios.delete(
    `${DELETE_COURT_ENDPOINT}/${courtId}`,
    config,
  );

  return response;
};

export default deleteCourtService;
