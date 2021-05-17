import getAllCourtsService from '../../services/courts/get/all';
import { loadAllCourts } from '../creators';

const getAllCourtsAction = async (dispatch, headers) => {
  const response = await getAllCourtsService(headers);
  // console.log(reponse)
  const allCourts = response.data;
  // console.log(allcourts)
  dispatch(loadAllCourts(allCourts));
};

export default getAllCourtsAction;
