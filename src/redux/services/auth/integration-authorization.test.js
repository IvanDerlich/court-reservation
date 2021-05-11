import signInService from './signIn';
import { getAllCourts } from '../courts/get';

describe('Authorization', () => {
  it('No login, no access', async () => {
    try {
      await getAllCourts();
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
    const response2 = await getAllCourts(headers);
    expect(response2.data.length).toBe(18);
  });
});
