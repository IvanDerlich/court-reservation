import axios from 'axios';
import { BOOKINGS_ON_OTHERS_ENDPOINT } from '../../URLs';

const getBookingsOnOthersService = headers => {
  const config = {
    headers,
  };

  const response = axios.get(
    // Improve this code: There has to be a way to send a params object
    `${BOOKINGS_ON_OTHERS_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getBookingsOnOthersService;
