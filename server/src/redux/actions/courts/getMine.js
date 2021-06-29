import getMyCourtsService from '../../services/courts/get/mine';
import {
  loadMyCourts,
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
} from '../creators';

const getMyCourtsAction = async (dispatch, headers) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const response = await getMyCourtsService(headers);
  const myCourts = response.data;
  dispatch(loadMyCourts(myCourts));
};

export default getMyCourtsAction;
