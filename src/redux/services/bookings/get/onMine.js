import axios from 'axios';
import { BOOKINGS_ON_MINE_ENDPOINT } from '../../URLs';

const getBookingsOnMyCourtsService = headers => {
  const config = {
    headers,
  };

  const response = axios.get(
    `${BOOKINGS_ON_MINE_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getBookingsOnMyCourtsService;
