import getBookingsOnMyCourts from './getBookingsOnMyCourts';
import store from '../../index';
import signInService from '../../services/auth/signIn';

describe('Test get Bookings on mMy courts', () => {
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
    expect(store.getState().bookingsOnMyCourts).toEqual([]);
    const response = await getBookingsOnMyCourts(store.dispatch, headers);
    console.log(response);
    // expect(store.getState().allCourts).toEqual(allCourtsInServer);
  });
});
