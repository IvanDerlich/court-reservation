import axios from 'axios';
import { COURTS_ENDPOINT } from '../URLs';

const deleteCourtService = (headers, courtId) => {
  const config = {
    headers,
  };

  const response = axios.delete(
    `${COURTS_ENDPOINT}/${courtId}`,
    config,
  );

  return response;
};

export default deleteCourtService;
