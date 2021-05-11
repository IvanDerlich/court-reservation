export const BASE_URL = 'http://127.0.0.1:3000';
export const SIGN_IN_ENDPOINT = `${BASE_URL}/api/v1/auth/sign_in`;
export const SIGN_UP_ENDPOINT = `${BASE_URL}/api/v1/auth`;
export const COURTS_ENDPOINT = `${BASE_URL}/courts`;
export const getBookingEnpoint = courtId => `${BASE_URL + COURTS_ENDPOINT + courtId}/bookings`;
