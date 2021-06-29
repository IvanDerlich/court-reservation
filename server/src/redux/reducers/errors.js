import { ADD_ERROR, CLEAN_ERRORS } from '../actionTypes';

const errors = (state = [], action) => {
  switch (action.type) {
    case ADD_ERROR:
      return [
        ...state,
        action.payload.errorMessage,
      ];
    case CLEAN_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errors;
