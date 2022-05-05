import signInService from './signIn';
import getAllCourtsService from '../courts/get/all';

describe('Authorization', () => {
  it('No login, no access', async () => {
    try {
      await getAllCourtsService();
      // should never reach this section
      expect(1).toBe(2);
    } catch (e) {
      expect(e.response.status).toBe(401);
    }
  });
  it('logs in and resource access', async () => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    const response = await signInService(email, password);
    const headers = {
      'access-token': response.headers['access-token'],
      client: response.headers.client,
      uid: response.headers.uid,
    };
    // console.log(response.headers);
    const response2 = await getAllCourtsService(headers);
    expect(response2.data.length).toBe(18);
  });
});
