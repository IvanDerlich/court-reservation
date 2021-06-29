import getAllCourtsService from '../../services/courts/get/all';
import {
  loadAllCourts,
  errorCleanUpActionCreator,
  messagesCleanUpActionCreator,
} from '../creators';

const getAllCourtsAction = async (dispatch, headers) => {
  dispatch(errorCleanUpActionCreator());
  dispatch(messagesCleanUpActionCreator());
  const response = await getAllCourtsService(headers);
  const allCourts = response.data;
  dispatch(loadAllCourts(allCourts));
};

export default getAllCourtsAction;
