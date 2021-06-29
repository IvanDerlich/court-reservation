/* eslint-disable no-console */
import getAllCourtsAction from './getAll';
import store from '../../index';
import signInService from '../../services/auth/signIn';
import allCourtsInServer from './getAllServerValue';

describe('', () => {
  let headers = {};
  beforeAll(done => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    try {
      signInService(email, password)
        .then(response => {
          headers = response.headers;
          done();
        });
    } catch (e) {
      console.log(e);
    }
  });

  it('', async () => {
    expect(store.getState().allCourts).toEqual([]);
    await getAllCourtsAction(store.dispatch, headers);
    expect(store.getState().allCourts).toEqual(allCourtsInServer);
  });

  it.skip("It doesn't return created_at and updated_at", () => {

  });
  it.skip('It returns administrator_name and the administrator_id', () => {

  });
});
