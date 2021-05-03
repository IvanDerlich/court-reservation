import { 
  LOGGED_IN,
  LOGGED_OUT,  
} from './actionTypes';

const loguinStatus = (state = '', action) => {
  switch (action.type) {
    case LOGGED_IN:
      return 'logged in';
    case LOGGED_OUT:
      return 'logged out';
    default:
      return state;
  }
};

export default loguinStatus;