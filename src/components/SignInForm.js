import './SignInForm.scss';

function SignInForm() {
  return (
    <form>
      <label htmlFor="email">
        Email:
        <input type="text" name="email" />
      </label>
      <label htmlFor="password">
        Name:
        <input type="text" name="password" />
      </label>
      <input type="submit" value="LogIn" />
    </form>
  );
}

export default SignInForm;
