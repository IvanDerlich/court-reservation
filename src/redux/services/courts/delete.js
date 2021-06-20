import axios from 'axios';
import { COURTS_ENDPOINT } from '../URLs';

const deleteCourtService = async (headers, courtId) => {
  const config = {
    headers,
  };

  try {
    await axios.delete(
      `${COURTS_ENDPOINT}/${courtId}`,
      config,
    );
  } catch (e) {
    return e.message;
  }
  return null;
};

export default deleteCourtService;
