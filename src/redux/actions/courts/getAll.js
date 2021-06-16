import getAllCourtsService from '../../services/courts/get/all';
import { loadAllCourts } from '../creators';

const getAllCourtsAction = async (dispatch, headers) => {
  const response = await getAllCourtsService(headers);
  const allCourts = response.data;
  dispatch(loadAllCourts(allCourts));
};

export default getAllCourtsAction;
