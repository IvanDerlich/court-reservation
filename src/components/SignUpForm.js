/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */

import './SignUpForm.scss';

function SignUpForm() {
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form>
        <div className="user-box">
          <input type="text" name="first_name" id="first_name" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="last_name" id="last_name" />
          <label htmlFor="last_name">Last Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="email" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="user-box">
          <input type="text" name="password" id="name" />
          <label htmlFor="password">Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="confirm_password" id="confirm_password" />
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
export default SignUpForm;
