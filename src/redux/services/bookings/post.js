import axios from 'axios';
import { getBookingsEndport } from '../URLs';

const postBookingService = (headers, booking) => {
  console.log('-----Inside Post Service------');
  console.log('Headers: ', headers);
  console.log('Booking', booking);

  /*
    deconstruct object before posting it
    to ignore malicious or unintended parameters
  */
  const {
    // eslint-disable-next-line camelcase
    courtId,
    date,
    description,
  } = booking;

  const data = {
    // court_id: courtId,
    date,
    description,
  };
  console.log('BOOKINGS_ENDPOINT: ', getBookingsEndport(courtId));
  console.log('Data: ', data);
  console.log('-------------');

  const config = {
    headers,
  };

  try {
    axios.post(
      getBookingsEndport(courtId),
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
