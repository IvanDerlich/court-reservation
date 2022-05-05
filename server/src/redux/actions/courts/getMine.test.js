/* eslint-disable no-console */
import getMyCourtsAction from './getMine';
import store from '../../index';
import signInService from '../../services/auth/signIn';
import myCourtsInServer from './getMineServerValue';

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
    await getMyCourtsAction(store.dispatch, headers);
    expect(store.getState().myCourts).toEqual(myCourtsInServer);
  });

  it.skip("It doesn't return created_at and updated_at", () => {

  });
  it.skip('It returns administrator_name and the administrator_id', () => {

  });
});
