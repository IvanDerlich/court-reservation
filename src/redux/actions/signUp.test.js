import faker from 'faker';
import store from '../index';
import signUpAction from './signUp';

describe('', () => {
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();
  const randomFirstName = faker.name.firstName();
  const randomLastName = faker.name.lastName();
  it('Successful Sign Up', async () => {
    expect(store.getState().headers).toBe(null);
    expect(store.getState().errors).toEqual([]);
    await signUpAction(
      store.dispatch,
      randomEmail,
      randomPassword,
      randomFirstName,
      randomLastName,
    );
    expect(store.getState().errors).toEqual([]);
    expect(store.getState().messages[0]).toContain('Sign Up successful');
  });
  describe.skip(' Invalid Email', () => {
    it('Invalid Email 1', () => {

    });
    it('Invalid Email 2', () => {

    });
    it('Empty Email', () => {

    });
  });
  describe.skip(' Invalid Password', () => {
    it('Invalid password 1', () => {

    });
    it('Invalid password 2', () => {

    });
    it('Empty password', () => {
    });
  });
  describe.skip('Invalid Email', () => {
    it('Invalid Email 1', () => {

    });
    it('Invalid Email 2', () => {

    });
    it('Empty Email', () => {

    });
  });

  describe.skip('Invalid First Name', () => {
    it('Invalid 1 First Name', () => {

    });
    it('Invalid 3 First Name', () => {

    });
    it('Empty First Name', () => {

    });
  });

  describe.skip('Invalid Last Name', () => {
    it('Invalid Last Name 1', () => {

    });
    it('Invalid Last Name 2', () => {

    });
    it('Empty Last Name', () => {

    });
  });
});
