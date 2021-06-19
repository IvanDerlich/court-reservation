import axios from 'axios';
import { getBookingsEndport } from '../URLs';

const postBookingService = async (headers, booking) => {
  /*
    deconstruct object before posting it
    to ignore malicious or unintended parameters
  */
  // const {
  //   // eslint-disable-next-line camelcase
  //   courtId,
  //   date,
  //   description,
  // } = booking;
  const { courtId } = booking;

  const data = {
    // court_id: courtId,
    booking,
  };

  const config = {
    headers,
  };

  console.log('-----Inside Post Service------');
  console.log('Headers: ', headers);
  console.log('Booking', booking);
  console.log('BOOKINGS_ENDPOINT: ', getBookingsEndport(courtId));
  console.log('Data: ', data);
  console.log('-------------');

  try {
    await axios.post(
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
