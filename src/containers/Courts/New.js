/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import createCourtAction from '../../redux/actions/courts/create';

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

function NewCourtForm({
  createCourt, headers,
}) {
  const classes = useStyles();
  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory();

  const maxLength = {
    name: 40,
    address: 50,
    description: 100,
  };
  const schema = yup.object().shape({
    name: yup
      .string('Please enter a string')
      .required('Please, type the court name')
      .max(
        maxLength.name,
        `Court name can't be longuer than ${maxLength.name} characters`,
      ),
    address: yup
      .string('Please enter a string')
      .required('Please, type the court address')
      .max(
        maxLength.address,
        `Address can't be longuer than ${maxLength.address} characters`,
      ),
    description: yup
      .string('Please enter a string')
      .max(
        maxLength.description,
        `Address can't be longuer than ${maxLength.description} characters`,
      ),
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
    const court = {
      name: document.querySelector('#name').value,
      address: document.querySelector('#address').value,
      description: document.querySelector('#description').value,
    };
    setShowSpinner(true);
    const errorMessage = await createCourt(headers, court);
    setShowSpinner(false);
    if (errorMessage) {
      setError('serverError', {
        type: 'serverError',
        message: errorMessage,
      });
    } else {
      history.push('/courts/mine');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Court
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Court Name"
                {...register('name')}
                error={errors.name !== undefined}
                helperText={
                  errors.name !== undefined && errors.name.message
                }
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                {...register('address')}
                error={errors.address !== undefined}
                helperText={
                  errors.address !== undefined && errors.address.message
                }
                // autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                {...register('description')}
                error={errors.description !== undefined}
                helperText={
                  errors.description !== undefined && errors.description.message
                }
                // autoComplete="email"
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
            Create Court
          </Button>
        </form>
      </div>
      <LinearProgress
        id="sign-in-spinner"
        className={showSpinner === false ? classes.hide : null}
      />
      {errors.serverError !== undefined && (
        <Alert severity="error">
          {errors.serverError.message}
        </Alert>
      )}
    </Container>
  );
}

NewCourtForm.propTypes = {
  createCourt: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createCourt: (headers, court) => createCourtAction(dispatch, headers, court),
});

const mapStateToProps = state => ({
  headers: state.headers,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCourtForm);
