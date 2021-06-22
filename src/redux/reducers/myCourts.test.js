import faker from 'faker';
import store from '../index';
import {
  loadMyCourts,
  deleteCourt,
} from '../actions/creators';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe('Court Reducer', () => {
  const myCourts = [
    {
      id: 4365,
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

  it('Set a list of stores', () => {
    expect(store.getState().allCourts).toEqual([]);
    store.dispatch(
      loadMyCourts(myCourts),
    );
    expect(store.getState().myCourts).toEqual(myCourts);
  });
  it('Remove a store', () => {
    expect(store.getState().myCourts).toEqual(myCourts);
    const action = deleteCourt(4365);
    store.dispatch(action);
    expect(store.getState().myCourts.length).toBe(2);
  });
});
