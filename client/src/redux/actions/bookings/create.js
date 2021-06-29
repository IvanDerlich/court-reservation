import postBookingService from '../../services/bookings/post';

import {
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
  messageActionCreator,
} from '../creators';

const createBookAction = async (dispatch, headers, court) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const error = await postBookingService(headers, court);
  if (error) {
    return error;
  }
  dispatch(messageActionCreator('Court booked successfully'));
  return null;
};

export default createBookAction;
