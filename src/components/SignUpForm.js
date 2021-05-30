/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
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
import LinearProgress from '@material-ui/core/LinearProgress';

import signUpAction from '../redux/actions/auth/signUp';

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

function SignUpForm({ signUp }) {
  const classes = useStyles();
  const [showSpinner, setShowSpinner] = useState(false);
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
    confirmEmail: yup
      .string('Please enter a string')
      .required('Please, type your user email')
      .oneOf([yup.ref('email'), null], 'Email must match'),
    confirmPassword: yup
      .string('Please enter a string')
      .required('Please, type your password')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;

    setShowSpinner(true);
    const errorMessage = await signUp(email, password, firstName, lastName);
    setShowSpinner(false);
    if (errorMessage) {
      setError('serverError', {
        type: 'serverError',
        message: errorMessage,
      });
    } else {
      history.push('/signin');
    }
  };

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
                error={errors.firstName !== undefined}
                helperText={
                  errors.firstName !== undefined && errors.firstName.message
                }
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
                error={errors.lastName !== undefined}
                helperText={
                  errors.lastName !== undefined && errors.lastName.message
                }
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
                error={errors.email !== undefined}
                helperText={
                  errors.email !== undefined && errors.email.message
                }
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
                error={errors.confirmEmail !== undefined}
                helperText={
                  errors.confirmEmail !== undefined && errors.confirmEmail.message
                }
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
                error={errors.password !== undefined}
                helperText={
                  errors.password !== undefined && errors.password.message
                }
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
                error={errors.confirmPassword !== undefined}
                helperText={
                  errors.confirmPassword !== undefined && errors.confirmPassword.message
                }
                // autoComplete="current-password"
              />
            </Grid>
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
      <LinearProgress
        id="sign-in-spinner"
        className={showSpinner === false ? classes.hide : null}
      />
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <a href="http://ivanderlich.com" className={classes.ivanderlich}>Ivan Derlich</a>
          {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
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
