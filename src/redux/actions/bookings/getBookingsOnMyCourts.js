import getBookingsOnMyCourtsService from '../../services/bookings/get/onMine';
import { loadBookingsOnMyCourts } from '../creators';

async function getBookingsOnMyCourtsAction(dispatch, headers) {
  // console.log(headers, 'headers');
  const response = await getBookingsOnMyCourtsService(headers);
  // console.log(response);
  const bookingsOnMyCourts = response.data;
  // console.log(bookingsOnMyCourts);
  dispatch(loadBookingsOnMyCourts(bookingsOnMyCourts));
}
export default getBookingsOnMyCourtsAction;
