import getBookingsMineAction from './getMine';
import store from '../../index';
import signInService from '../../services/auth/signIn';

describe('Test get Mine', () => {
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
    expect(store.getState().bookingsMine).toEqual([]);
    await getBookingsMineAction(store.dispatch, headers);
    console.log(store.getState().bookingsMine);
    // expect(store.getState().allCourts).toEqual(allCourtsInServer);
  });
});
