/* eslint-disable no-console */
import signInAction from './signIn';
import store from '../index';

describe('Sign In', () => {
  const email = 'ivan@ivan.com';
  const password = '12345678';
  let headers = {};

  it('Sign in successfully', async () => {
    expect(store.getState().errors).toEqual([]);
    expect(store.getState().headers).toBe(null);
    await signInAction(store.dispatch, email, password);
    expect(store.getState().errors).toEqual([]);
    headers = store.getState().headers;
    expect(headers.uid).toBe(email);
    expect(headers['access-token'].length).toBe(22);
    expect(headers.client.length).toBe(22);
  });

  it('Sign in unsuccessfully', async () => {
    const email = 'ivan@ivan.comsdfgsdf';
    const password = '12345678sdfgsfd';
    expect(store.getState().errors).toEqual([]);
    expect(store.getState().headers).toEqual(headers);
    await signInAction(store.dispatch, email, password);
    expect(store.getState().errors[0]).toEqual('Wrong credentials');
  });

  it('Cleans error message with successful login', async () => {
    expect(store.getState().errors[0]).toEqual('Wrong credentials');
    expect(store.getState().headers).toBe(headers);
    await signInAction(store.dispatch, email, password);

    const state = store.getState();
    headers = state.headers;
    expect(headers.uid).toBe(email);
    expect(headers['access-token'].length).toBe(22);
    expect(headers.client.length).toBe(22);

    // Errors cleansed
    expect(state.errors).toEqual([]);
  });
});
