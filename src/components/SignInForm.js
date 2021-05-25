/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import signInAction from '../redux/actions/auth/signIn';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  ivanderlich: {
    cursor: 'pointer',
  },
  hide: {
    display: 'none',
  },
}));

function SignInForm({ signIn, logged }) {
  const classes = useStyles();
  const history = useHistory();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (logged) {
      history.push('/', { from: 'Sign In' });
    }
  }, [logged]);

  const onSubmit = async event => {
    event.preventDefault();
    setShowSpinner(true);
    const email = document.querySelector('#sign-in-email').value;
    const password = document.querySelector('#sign-in-password').value;
    const response = await signIn(email, password);
    console.log(response);
  };

  const maxEmailLength = 30;
  const schema = yup.object().shape({
    'sign-in-email': yup
      .string()
      .required('Please, type your user email')
      .email('Please type something in the shape of an email')
      .max(
        maxEmailLength,
        `The email can't be longuer than ${maxEmailLength} characters`,
      ),
    'sign-in-password': yup.string().required('Please, type your password'),
  });

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            name="email"
            id="sign-in-email"
            {...register('sign-in-email')}
            error={errors['sign-in-email'] !== undefined}
            helperText={
              errors['sign-in-email'] !== undefined && errors['sign-in-email'].message
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="sign-in-password"
            autoComplete="current-password"
            {...register('sign-in-password')}
            error={errors['sign-in-password'] !== undefined}
            helperText={
              errors['sign-in-password'] !== undefined && errors['sign-in-password'].message
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <LinearProgress
            id="sign-in-spinner"
            className={showSpinner === false ? classes.hide : null}
          />
          <Grid container>
            <Grid item>
              Don't have an account?
              {' '}
              <Link to="/signup">Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
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

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => signInAction(dispatch, email, password),
});

const mapStateToProps = state => ({
  logged: !!state.headers,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInForm);
