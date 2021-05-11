import faker from 'faker';
import store from '../index';
import { errorMessageActionCreator, errorCleanUpActionCreator } from '../actions/creators';
// import errors from './errors';

describe('Errors', () => {
  const error1 = faker.lorem.words(100);
  const error2 = faker.lorem.words(100);
  const error3 = faker.lorem.words(100);
  it('Sends message to state', () => {
    expect(store.getState().errors).toEqual([]);
    // dispatch action
    store.dispatch(
      errorMessageActionCreator(error1),
    );
    expect(store.getState().errors[0]).toEqual(error1);
    store.dispatch(
      errorMessageActionCreator(error2),
    );
    expect(store.getState().errors[0]).toEqual(error1);
    expect(store.getState().errors[1]).toEqual(error2);
  });
  it('Cleans Errors', () => {
    store.dispatch(errorCleanUpActionCreator());
    expect(store.getState().errors).toEqual([]);
  });
  it('Sends error messages again', () => {
    store.dispatch(
      errorMessageActionCreator(error3),
    );
    expect(store.getState().errors[0]).toEqual(error3);
    store.dispatch(errorCleanUpActionCreator());
    expect(store.getState().errors).toEqual([]);
  });
});
