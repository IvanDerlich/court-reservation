import getBookingsMineService from '../../services/bookings/get/mine';
import { loadBookingsMine } from '../creators';

async function getMyBookingsAction(dispatch, headers) {
  // console.log(headers, 'headers');
  const response = await getBookingsMineService(headers);
  // console.log(response);
  const bookingsMine = response.data;
  // console.log(bookingsMine);
  const action = loadBookingsMine(bookingsMine);
  // console.log(action);
  dispatch(action);
}
export default getMyBookingsAction;
