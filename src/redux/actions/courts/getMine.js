import getMyCourtsService from '../../services/courts/get/mine';
import { loadMyCourts } from '../creators';

const getMyCourtsAction = async (dispatch, headers) => {
  // console.log(headers, 'headers');
  const response = await getMyCourtsService(headers);
  // console.log(reponse)
  const myCourts = response.data;
  // console.log(myCourts);
  dispatch(loadMyCourts(myCourts));
};

export default getMyCourtsAction;
