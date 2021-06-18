import axios from 'axios';
import { BOOKINGS_ENDPOINT } from '../URLs';

const postBookingService = (headers, booking) => {
  /*
    deconstruct object before posting it
    to ignore malicious or unintended parameters
  */
  const {
    // eslint-disable-next-line camelcase
    court_id,
    date,
    description,
  } = booking;

  const data = {
    court_id,
    date,
    description,
  };

  const config = {
    headers,
  };

  try {
    axios.post(
      BOOKINGS_ENDPOINT,
      data,
      config,
    );
    return null;
  } catch (e) {
    if (e.message === 'Request failed with status code 401') {
      return "You can't book a court if you are not signed in";
    }
    return e.message;
  }
};

export default postBookingService;
