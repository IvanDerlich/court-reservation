import faker from 'faker';
import store from '../index';
import { loginActionCreator, logoutActionCreator } from '../actions/creators';

describe('Headers Reducer', () => {
  const string = faker.lorem.words(100);
  it('Dispatches a string', () => {
    expect(store.getState().headers).toBe(null);
    const action = loginActionCreator(string);
    store.dispatch(action);
    expect(store.getState().headers).toBe(string);
  });
  it('Logs out', () => {
    expect(store.getState().headers).toBe(string);
    const action = logoutActionCreator();
    // console.log(action);
    store.dispatch(action);
    // console.log(store.getState().headers);
    expect(store.getState().headers).toBe(null);
  });
  it('Dispatches an object', () => {
    expect(store.getState().headers).toBe(null);
    const object = {
      attribute1: faker.lorem.words(100),
      attribute2: faker.lorem.words(100),
    };
    store.dispatch(loginActionCreator(object));
    expect(store.getState().headers).toBe(object);
  });
});
