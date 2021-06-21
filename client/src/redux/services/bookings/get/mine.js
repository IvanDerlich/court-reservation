import axios from 'axios';
import { MY_BOOKINGS_ENDPOINT } from '../../URLs';

const getMyBookingsService = headers => {
  const config = {
    headers,
  };

  const response = axios.get(
    `${MY_BOOKINGS_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getMyBookingsService;
