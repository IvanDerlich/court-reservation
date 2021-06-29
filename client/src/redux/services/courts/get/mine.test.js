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
        const response = await getMyCourtsService(headers);
        expect(response.status).toBe(200);
        expect(response.data.length).toBe(10);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
