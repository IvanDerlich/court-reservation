import getMyCourtsService from '../../services/courts/get/mine';
import { loadMyCourts } from '../creators';

const getMyCourtsAction = async (dispatch, headers) => {
  const response = await getMyCourtsService(headers);
  const myCourts = response.data;
  dispatch(loadMyCourts(myCourts));
};

export default getMyCourtsAction;
