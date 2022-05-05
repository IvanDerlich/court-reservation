import store from '../index';
import { loadBookingsOnMyCourts } from '../actions/creators';

describe('Bookings on my courts', () => {
  it('', () => {
    expect(store.getState().bookingsOnMyCourts).toEqual([]);
    const allCourts = [0, 1, 2, 3, 4];
    store.dispatch(
      loadBookingsOnMyCourts(allCourts),
    );
    expect(store.getState().bookingsOnMyCourts).toEqual(allCourts);
  });
});
