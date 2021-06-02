import { LOAD_MY_COURTS } from '../actionTypes';

const myCourts = (
  state = [],
  action,
) => {
  switch (action.type) {
    case LOAD_MY_COURTS:
      return action.payload.myCourts;
    default:
      return state;
  }
};

export default myCourts;
