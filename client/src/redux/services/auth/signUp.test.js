/* eslint-disable no-console */
import faker from 'faker';
import signUpService from './signUp';

describe('Sign Up', () => {
  it('Sign up successfully', async () => {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    try {
      const response = await signUpService(email, password, firstName, lastName);
      // console.log(response);
      expect(response.status).toBe(200);
      expect(response.data.data.email).toEqual(email);
      expect(response.data.data.uid).toBe(email);
      expect(response.data.data.first_name).toBe(firstName);
      expect(response.data.data.last_name).toBe(lastName);
    } catch (e) {
      console.log(e);
      expect(e).toBe(undefined);
    }
  });
});
