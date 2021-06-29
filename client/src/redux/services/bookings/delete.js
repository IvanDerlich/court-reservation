import axios from 'axios';
import { getBookingsEndport } from '../URLs';

const deleteBookingService = async (headers, courtId, bookingId) => {
  // console.log(headers);
  // console.log(courtId);
  // console.log(bookingId);
  const config = {
    headers,
  };

  try {
    await axios.delete(
      `${getBookingsEndport(courtId)}/${bookingId}`,
      config,
    );
  } catch (e) {
    return e.message;
  }
  return null;
};

export default deleteBookingService;
