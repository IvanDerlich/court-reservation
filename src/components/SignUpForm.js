/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import './SignUpForm.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import signUpAction from '../redux/actions/signUp';

function SignUpForm() {
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

  const handleSubmit = () => {
    console.log('Submit');
    setRegistered(true);
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
          <input type="text" name="first_name" id="sign-up-first_name" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="last_name" id="sign-up-last_name" />
          <label htmlFor="last_name">Last Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="email" id="sign-up-email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" id="sign-up-name" />
          <label htmlFor="password">Name</label>
        </div>
        <div className="user-box">
          <input type="password" name="confirm_password" id="sign-up-confirm_password" />
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
export default connect()(SignUpForm);
