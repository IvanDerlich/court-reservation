import { LOAD_ALL_COURTS } from '../actionTypes';

const allCourts = (
  state = [],
  action,
) => {
  switch (action.type) {
    case LOAD_ALL_COURTS:
      return action.payload.allCourts;
    default:
      return state;
  }
};

export default allCourts;
