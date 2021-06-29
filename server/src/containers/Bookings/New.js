/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import createBookingAction from '../../redux/actions/bookings/create';

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

function NewBookingForm({
  courtId,
  headers,
  createBooking,
}) {
  const [selectedDate, handleDateChange] = useState(new Date('Sat Jun 19 2021 05:00:00'));
  const [showSpinner, setShowSpinner] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const maxLength = {
    name: 40,
    address: 50,
    description: 100,
  };
  const schema = yup.object().shape({
    description: yup
      .string('Please enter a string')
      .max(
        maxLength.description,
        `Description can't be longuer than ${maxLength.description} characters`,
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
    setShowSpinner(true);
    const booking = {
      courtId,
      date: selectedDate,
      description: document.querySelector('#description').value,
    };
    const errorMessage = await createBooking(headers, booking);
    if (errorMessage) {
      setError('serverError', {
        type: 'serverError',
        message: errorMessage,
      });
    } else {
      history.push('/bookings/mybookings');
    }
    setShowSpinner(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Book Court
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Pick day"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="Pick  hour"
                  value={selectedDate}
                  onChange={handleDateChange}
                  minutesStep={60}
                />
              </Grid>
            </MuiPickersUtilsProvider>
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
              />
            </Grid>
          </Grid>
          <LinearProgress
            id="sign-in-spinner"
            className={showSpinner === false ? classes.hide : null}
          />
          {errors.serverError !== undefined && (
            <Alert severity="error">
              {errors.serverError.message}
            </Alert>
          )}
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
    </Container>
  );
}

NewBookingForm.propTypes = {
  courtId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
  createBooking: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createBooking: (headers, booking) => createBookingAction(dispatch, headers, booking),
});

const mapStateToProps = state => ({
  headers: state.headers,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewBookingForm);
