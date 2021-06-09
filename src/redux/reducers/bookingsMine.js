import { LOAD_MY_BOOKINGS } from '../actionTypes';

const bookingsMine = (
  state = [],
  action,
) => {
  switch (action.type) {
    case LOAD_MY_BOOKINGS:
      return action.payload.bookingsMine;
    default:
      return state;
  }
};

export default bookingsMine;
