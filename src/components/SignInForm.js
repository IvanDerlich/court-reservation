/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './SignInForm.scss';

function SignInForm() {
  const handleSubmit = () => {
    console.log('Submit');
  };

  return (
    <div className="login-box">
      <h2>Sign In</h2>
      <form>
        <div className="user-box">
          <input type="text" name="email" id="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="user-box">
          <input type="text" name="password" id="password" />
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

export default SignInForm;
