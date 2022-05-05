import getBookingsOnMyCourtsService from '../../services/bookings/get/onMine';
import {
  loadBookingsOnMyCourts,
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
} from '../creators';

async function getBookingsOnMyCourtsAction(dispatch, headers) {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  // console.log(headers, 'headers');
  const response = await getBookingsOnMyCourtsService(headers);
  // console.log(response);
  const bookingsOnMyCourts = response.data;
  // console.log(bookingsOnMyCourts);
  dispatch(loadBookingsOnMyCourts(bookingsOnMyCourts));
}
export default getBookingsOnMyCourtsAction;
