import postBookingService from '../../services/bookings/post';

import {
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
  // messageActionCreator,
} from '../creators';

const createBookAction = async (dispatch, headers, court) => {
  console.log('------Inside Action--------');
  console.log('Dispatch: ', dispatch);
  console.log('Headers: ', headers);
  console.log('Court: ', court);
  console.log('-------------');
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  await postBookingService(headers, court);
  // const error = await postBookingService(headers, court);
  // if (error) {
  //   return error;
  // }
  // dispatch(messageActionCreator('Court booked successfully'));
  // return null;
};

export default createBookAction;
