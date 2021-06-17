import deleteCourtService from '../../services/courts/delete';
import {
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
  deleteCourt,
} from '../creators';

const createCourtAction = async (dispatch, headers, courtId) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const error = await deleteCourtService(headers, courtId);
  dispatch(deleteCourt(courtId));
  return error;
};

export default createCourtAction;
