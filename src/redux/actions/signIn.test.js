/* eslint-disable no-console */
import signInAction from './signIn';
import store from '../index';

describe('Sign In', () => {
  it('Sign in successfully', async () => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    const response = await signInAction(store.dispatch, email, password);
    console.log(response);
    // console.log(store.getState().headers);
    // expect(store.getState().headers).not.toBe(null);
    // expect(store.getState()).not.toBe(null);
    // const { uid, _email } = store.getState().headers;
    // expect(_email).toBe(email);
    // expect(uid).toBe(email);
    // const accessToken = store.getState().headers['access-token'];
    // expect(accessToken.length).toBe(22);
  });
  it('Sign in unccessfully', async () => {
  });
});
