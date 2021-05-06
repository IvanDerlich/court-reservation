/* eslint-disable no-console */
import login from './login';

describe('Login', () => {
  it('Login successfully', async () => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    try {
      const response = await login(email, password);
      // console.log(response);
      expect(response.status).toBe(200);
      expect(response.data.data.email).toBe(email);
      expect(response.data.data.uid).toBe(email);
      expect(response.data.data.first_name).toBe('Ivan');
      expect(response.data.data.last_name).toBe('Derlich');
      expect(response.headers['access-token'].length).toBe(22);
    } catch (e) {
      console.log(e);
      expect(e).toBe(undefined);
    }
  });
});
