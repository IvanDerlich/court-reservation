/* eslint-disable no-console */
import signInService from '../../auth/signIn';
import getMyCourtsService from './mine';

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
  describe('getMyCourts', () => {
    it('Returns some', async () => {
      try {
        const response = await getMyCourtsService(headers);
        console.log('Response in My Courts');
        console.log(response);
        // expect(response.status).toBe(200);
        // expect(response.data.length).toBe(18);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
