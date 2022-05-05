import { LOAD_MY_COURTS, DELETE_COURT } from '../actionTypes';

const myCourts = (
  state = [],
  action,
) => {
  switch (action.type) {
    case LOAD_MY_COURTS:
      return action.payload.myCourts;
    case DELETE_COURT:
      return state.filter(court => (
        court.id !== action.payload.courtId
      ));
    default:
      return state;
  }
};

export default myCourts;
