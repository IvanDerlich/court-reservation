import faker from 'faker';
import store from '../index';
import { loadMyCourts } from '../actions/creators';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe('Court Reducer', () => {
  it('Set a list of stores', () => {
    expect(store.getState().allCourts).toEqual([]);
    const myCourts = [
      {
        id: getRandomInt(100),
        name: faker.name.findName(),
        address: faker.address.streetAddress,
        description: faker.lorem.text(100),
      },
      {
        id: getRandomInt(100),
        name: faker.name.findName(),
        address: faker.address.streetAddress,
        description: faker.lorem.text(100),
      },
      {
        id: getRandomInt(100),
        name: faker.name.findName(),
        address: faker.address.streetAddress,
        description: faker.lorem.text(100),
      },
    ];
    store.dispatch(
      loadMyCourts(myCourts),
    );
    expect(store.getState().myCourts).toEqual(myCourts);
  });
});
