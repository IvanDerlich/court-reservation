import deleteBookingService from '../../services/bookings/delete';

import {
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
  errorMessageActionCreator,
  deleteBookingActionCreator,
} from '../creators';

const deleteCourtAction = async (dispatch, headers, courtId, bookingId) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const error = await deleteBookingService(headers, courtId, bookingId);
  if (error) {
    dispatch(errorMessageActionCreator(error));
  } else {
    dispatch(deleteBookingActionCreator(bookingId));
  }
  return error;
};

export default deleteCourtAction;
