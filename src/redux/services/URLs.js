export const BASE_URL = 'http://127.0.0.1:3000';
export const SIGN_IN_ENDPOINT = `${BASE_URL}/api/v1/auth/sign_in`;
export const SIGN_UP_ENDPOINT = `${BASE_URL}/api/v1/auth`;
export const ALL_COURTS_ENDPOINT = `${BASE_URL}/courts`;
export const MY_COURTS_ENDPOINT = `${BASE_URL}/user/courts`;
export const MY_BOOKINGS_ON_OTHERS_COURTS_ENDPOINT = `${BASE_URL}/bookings/mine`;
export const OTHERS_BOOKINGS_ON_MYCOURTS_ENDPOINT = `${BASE_URL}/bookings/others`;
// export const getBookingEnpoint = courtId =>
// `${BASE_URL + ALL_COURTS_ENDPOINT + courtId}/bookings`;
