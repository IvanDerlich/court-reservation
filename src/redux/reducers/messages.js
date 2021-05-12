import { ADD_MESSAGE, CLEAN_MESSAGES } from '../actionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        action.payload.errorMessage,
      ];
    case CLEAN_MESSAGES:
      return [];
    default:
      return state;
  }
};

export default messages;
