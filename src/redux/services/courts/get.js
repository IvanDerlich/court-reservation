/* eslint-disable no-return-await */
import axios from 'axios';
import { COURTS_ENDPOINT } from '../URLs';

export function getAllCourts(headers) {
  return axios.get(COURTS_ENDPOINT, { headers });
}

export async function getOneCourt(courtId) {
  return courtId;
  // return await axios.GET(COURTS_ENDPOINT);
}

export async function getAllUserSCourts(userId) {
  return userId;
  // const data = { userId };
  // return await axios.GET(COURTS_ENDPOINT, data);
}
