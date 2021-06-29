import faker from 'faker';
import store from '../index';
import { loadAllCourts } from '../actions/creators';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe('Court Reducer', () => {
  it('Set a list of stores', () => {
    expect(store.getState().allCourts).toEqual([]);
    const allCourts = [
      {
        name: faker.name.findName(),
        address: faker.address.streetAddress,
        description: faker.lorem.text(100),
        administrator_id: getRandomInt(3),
      },
      {
        name: faker.name.findName(),
        address: faker.address.streetAddress,
        description: faker.lorem.text(100),
        administrator_id: getRandomInt(3),
      },
      {
        name: faker.name.findName(),
        address: faker.address.streetAddress,
        description: faker.lorem.text(100),
        administrator_id: getRandomInt(3),
      },
    ];
    store.dispatch(
      loadAllCourts(allCourts),
    );
    expect(store.getState().allCourts).toEqual(allCourts);
  });
});
