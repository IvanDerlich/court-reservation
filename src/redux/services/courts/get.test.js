/* eslint-disable no-console */
// Test all exports from the get file
import signInService from '../auth/signIn';
import {
  getAllCourts,
  // getOneCourt,
  // getAllUserSCourts,
} from './get';

describe('Test Court Get methods', () => {
  let headers;
  beforeAll(done => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    try {
      signInService(email, password)
        .then(response => {
          headers = response.headers;
          done();
        });
    } catch (e) {
      console.log(e);
    }
  });
  describe('getAllCourts', () => {
    it('Returns 10 courts', async () => {
      try {
        const response = await getAllCourts(headers);
        expect(response.status).toBe(200);
        expect(response.data.length).toBe(18);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
