// import axios from 'axios';
import login from './login';
// const flushPromises = () => new Promise(setImmediate);
// jest.setTimeout(5000);

describe('Login', () => {
  it.only('Login successfully', done => {
    const email = 'ivan@ivan.com';
    const password = '12345678';
    login(email, password)
      .then(response => {
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.data.data.email).toBe(email);
        expect(response.data.data.uid).toBe(email);
        expect(response.data.data.first_name).toBe('Ivan');
        expect(response.data.data.last_name).toBe('Derlich');

        // console.log(response.headers['access-token']);
        done();
      });
  });
});
