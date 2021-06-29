import postCourtService from '../../services/courts/post';
import {
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
  messageActionCreator,
} from '../creators';

const createCourtAction = async (dispatch, headers, court) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const error = await postCourtService(headers, court);
  if (error) {
    return error;
  }
  dispatch(messageActionCreator('Court created successfully'));
  return null;
};

export default createCourtAction;
