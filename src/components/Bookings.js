import './Bookings.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import BookingsContent from './BookingsContent';

// import CourtMenu from './CourtsMenu';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  paper: {
    // marginRight: theme.spacing(2),
    margin: '30px',
  },
}));

function Bookings({ logged }) {
  const classes = useStyles();

  if (!logged) {
    return (
      <Alert severity="error">
        Unauthorized. Please Log In
      </Alert>
    );
  }
  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className="courts-title">Bookings</Typography>
        <MenuList>
          <MenuItem>
            <Link to="/bookings/mine">
              My Bookings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/bookings/ofmycourts">
              Bookings on my courts
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/courts/all">
              Book a court
            </Link>
          </MenuItem>
        </MenuList>
      </Paper>
      <BookingsContent />
    </Grid>
  );
}

Bookings.propTypes = {
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  logged: !!state.headers,
});

export default connect(
  mapStateToProps,
)(Bookings);
