import deleteCourtService from '../../services/courts/delete';
import { deleteCourt } from '../creators';

const createCourtAction = async (dispatch, headers, courtId) => {
  // console.log('Headers:', headers);
  // console.log('Court Id:', courtId);
  const error = await deleteCourtService(headers, courtId);
  dispatch(deleteCourt(courtId));
  return error;
};

export default createCourtAction;
