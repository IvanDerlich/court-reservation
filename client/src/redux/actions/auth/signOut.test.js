import faker from 'faker';
import store from '../../index';
import signOutAction from './signOut';
import signInAction from './signIn';
import { errorMessageActionCreator } from '../creators';

describe('Sign out Action', () => {
  const email = 'ivan@ivan.com';
  const password = '12345678';
  let headers = {};

  it('Success', async () => {
    expect(store.getState().headers).toBe(null);
    expect(store.getState().errors).toEqual([]);

    // Signs in
    await signInAction(store.dispatch, email, password);

    // Check correct sign in
    expect(store.getState().errors).toEqual([]);
    headers = store.getState().headers;
    expect(headers.uid).toEqual(email);
    expect(headers['access-token'].length).toBe(22);
    expect(headers.client.length).toBe(22);

    // Send an error message to the state dispatcher
    store.dispatch(
      errorMessageActionCreator(faker.lorem.words(10)),
    );

    // triggers the logout action
    signOutAction(store.dispatch);

    // Check correct logout
    expect(store.getState().headers).toBe(null);
    expect(store.getState().errors).toEqual([]);
  });
});
