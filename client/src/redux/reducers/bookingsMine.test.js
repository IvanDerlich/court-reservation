import store from '../index';
import { loadBookingsMine } from '../actions/creators';

describe('My Bookings', () => {
  it('', () => {
    expect(store.getState().bookingsMine).toEqual([]);
    // const myBookings = [0, 1, 2, 3, 4];
    const myBookings = 'Test data';
    store.dispatch(
      loadBookingsMine(myBookings),
    );
    expect(store.getState().bookingsMine).toEqual(myBookings);
  });
});
