/* eslint-disable no-console */
import signInService from '../../auth/signIn';
import getBookingsOnMyCourtsService from './onMine';

describe('Test Court Get methods', () => {
  let headers;
  beforeAll(done => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    try {
      signInService(email, password)
        .then(response => {
          headers = response.headers;
          expect(response.status).toBe(200);
          done();
        });
    } catch (e) {
      console.log(e);
    }
  });
  describe('getMyCourts', () => {
    it('Returns my courts', async () => {
      try {
        const response = await getBookingsOnMyCourtsService(headers);
        console.log(response);
        // expect(response.data).toEqual(serverValue);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
