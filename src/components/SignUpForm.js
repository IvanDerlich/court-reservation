/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import signUpAction from '../redux/actions/auth/signUp';
import {
  errorMessageActionCreator,
} from '../redux/actions/creators';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hide: {
    display: 'none',
  },
}));

function SignUpForm({ signUp, dispatch }) {
  const classes = useStyles();
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

  const maxEmailLength = 30;
  const maxFirstNameLength = 30;
  const maxLastNameLength = 30;
  const schema = yup.object().shape({
    firstName: yup
      .string('Please enter a string')
      .required('Please, type your user first name')
      .max(
        maxFirstNameLength,
        `First name can't be longuer than ${maxFirstNameLength} characters`,
      ),
    lastName: yup
      .string('Please enter a string')
      .required('Please, type your user first name')
      .max(
        maxLastNameLength,
        `Last name can't be longuer than ${maxLastNameLength} characters`,
      ),
    email: yup
      .string('Please enter a string')
      .required('Please, type your user email')
      .email('Please type something in the shape of an email')
      .max(
        maxEmailLength,
        `The email can't be longuer than ${maxEmailLength} characters`,
      ),
    password: yup
      .string('Please enter a string')
      .required('Please, type your password'),
    confirmPassword: yup
      .string('Please enter a string')
      .required('Please, type your password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const email = document.querySelector('#sign-up-email').value;
    // console.log(email, 'email');
    const password = document.querySelector('#sign-up-password').value;
    // console.log(password, 'password');
    const confirmPassword = document.querySelector('#sign-up-confirm-password').value;
    // console.log(confirmPassword, 'confirm password');
    const firstName = document.querySelector('#sign-up-first-name').value;
    // console.log(firstName, 'first name');
    const lastName = document.querySelector('#sign-up-last-name').value;
    // console.log(lastName, 'last name');
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...register('firstName')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                {...register('lastName')}
                // autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                {...register('email')}
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="confirm-email"
                label="Confirm Email Address"
                name="email"
                {...register('confirmEmail')}
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register('password')}
                // autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                {...register('confirmPassword')}
                // autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              Already have an account?
              {' '}
              <Link to="/signin">Sign In</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <a href="http://ivanderlich.com" className={classes.ivanderlich}>Ivan Derlich</a>
          {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
      {/* <div className="login-box">
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
            <input type="password" name="confirm_password" id="sign-up-password-confirmation" />
            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
          <div className="submit">
            <a onClick={onSubmit}>
              <span />
              <span />
              <span />
              <span />
              Submit
            </a>
          </div>
        </form>
      </div> */}
    </Container>
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
