import axios from 'axios';
import { CREATE_COURT_ENDPOINT } from '../URLs';

const postCourtService = (headers, court) => {
  /*
    deconstruct object before posting it
    to ignore malicious or unintended parameters
  */
  const {
    name,
    address,
    description,
  } = court;

  const data = {
    name,
    address,
    description,
  };

  const config = {
    headers,
  };

  try {
    axios.post(
      CREATE_COURT_ENDPOINT,
      data,
      config,
    );
    return null;
  } catch (e) {
    if (e.message === 'Request failed with status code 401') {
      return "You can't create a court if you are not signed in";
    }
    return e.message;
  }
};

export default postCourtService;
