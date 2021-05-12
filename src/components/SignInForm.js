/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SignInForm.scss';
import signInAction from '../redux/actions/signIn';

function SignInForm({ signIn }) {
  const handleSubmit = () => {
    // console.log('Submit');
    const email = document.querySelector('#sign-in-email').value;
    // console.log(email);
    const password = document.querySelector('#sign-in-password').value;
    // console.log(password);
    signIn(email, password);
  };

  return (
    <div className="login-box">
      <h2>Sign In</h2>
      <form>
        <div className="user-box">
          <input type="text" name="email" id="sign-in-email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="user-box">
          <input type="text" name="password" id="sign-in-password" />
          <label htmlFor="password">Password</label>
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

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => signInAction(dispatch, email, password),
});

export default connect(
  null,
  mapDispatchToProps,
)(SignInForm);
