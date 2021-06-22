import {
  LOAD_MY_BOOKINGS,
  DELETE_BOOKING,
} from '../actionTypes';

const bookingsMine = (
  state = [],
  action,
) => {
  switch (action.type) {
    case LOAD_MY_BOOKINGS:
      return action.payload.bookingsMine;
    case DELETE_BOOKING:
      return state.filter(booking => (
        booking.id !== action.payload.bookingId
      ));
    default:
      return state;
  }
};

export default bookingsMine;
