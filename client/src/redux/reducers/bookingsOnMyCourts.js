import { LOAD_BOOKINGS_ON_MY_COURTS } from '../actionTypes';

const bookingsOnMyCourts = (
  state = [],
  action,
) => {
  switch (action.type) {
    case LOAD_BOOKINGS_ON_MY_COURTS:
      return action.payload.bookingsOnMyCourts;
    default:
      return state;
  }
};

export default bookingsOnMyCourts;
