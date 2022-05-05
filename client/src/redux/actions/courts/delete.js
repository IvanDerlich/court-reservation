import deleteCourtService from '../../services/courts/delete';
import {
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
  errorMessageActionCreator,
  deleteCourt,
} from '../creators';

const deleteCourtAction = async (dispatch, headers, courtId) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const error = await deleteCourtService(headers, courtId);
  if (error === undefined) {
    dispatch(deleteCourt(courtId));
  } else {
    dispatch(errorMessageActionCreator(error));
  }
};

export default deleteCourtAction;
