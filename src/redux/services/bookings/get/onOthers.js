import axios from 'axios';
import { MY_BOOKINGS_ON_OTHERS_COURTS_ENDPOINT } from '../../URLs';

const getAllCourtsService = headers => {
  // console.log(COURTS_ENDPOINT);
  // console.log(response, 'response');

  const config = {
    headers,
  };

  const response = axios.get(
    // Improve this code: There has to be a way to send a params object
    `${MY_BOOKINGS_ON_OTHERS_COURTS_ENDPOINT}?email=${headers.uid}`,
    config,
  );
  return response;
};

export default getAllCourtsService;
