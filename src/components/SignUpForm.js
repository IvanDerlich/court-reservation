/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SignUpForm.scss';
import { useHistory } from 'react-router-dom';
import signUpAction from '../redux/actions/signUp';
import {
  errorMessageActionCreator,
} from '../redux/actions/creators';

function SignUpForm({ signUp, dispatch }) {
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

  const handleSubmit = async () => {
    const email = document.querySelector('#sign-up-email').value;
    console.log(email, 'email');
    const password = document.querySelector('#sign-up-password').value;
    console.log(password, 'password');
    const confirmPassword = document.querySelector('#sign-up-confirm-password').value;
    console.log(confirmPassword, 'confirm password');
    const firstName = document.querySelector('#sign-up-first-name').value;
    console.log(firstName, 'first name');
    const lastName = document.querySelector('#sign-up-last-name').value;
    console.log(lastName, 'last name');
    if (password !== confirmPassword) {
      await dispatch(errorMessageActionCreator("Password and confirm password doesn't match"));
    }

    if (await signUp(email, password, firstName, lastName) === 200) {
      setRegistered(true);
    }
  };

  useEffect(() => {
    if (registered) {
      history.push('/signin', { from: 'Sign Up' });
    }
  }, [registered]);
  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form>
        <div className="user-box">
          <input type="text" name="first_name" id="sign-up-first-name" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="last_name" id="sign-up-last-name" />
          <label htmlFor="last_name">Last Name</label>
        </div>
        <div className="user-box">
          <input type="" name="email" id="sign-up-email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" id="sign-up-password" />
          <label htmlFor="password">Password</label>
        </div>
        <div className="user-box">
          <input type="password" name="confirm_password" id="sign-up-confirm-password" />
          <label htmlFor="confirm_password">Confirm Password</label>
        </div>
        <div className="submit">
          <a onClick={handleSubmit}>
            <span />
            <span />
            <span />
            <span />
            Submit
          </a>
        </div>
      </form>
    </div>
  );
}

SignUpForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signUp: (email,
    password,
    firstName,
    lastName) => signUpAction(dispatch, email, password, firstName, lastName),
  dispatch,
});

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);
