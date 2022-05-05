/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import DeleteButton from '@material-ui/icons/DeleteOutlined';

import deleteBookingAction from '../../redux/actions/bookings/delete';
import getMyBookingsAction from '../../redux/actions/bookings/getMine';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 50,
  },
  spinner: {
    marginTop: 100,
  },
  deleteButton: {
    cursor: 'pointer',
  },
});

/* eslint-disable react/no-unescaped-entities */
function BookingsShowMine({
  bookings, getMyBookings, headers, deleteBooking,
}) {
  const classes = useStyles();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    getMyBookings(headers);
    setShowSpinner(false);
  }, []);

  if (showSpinner) {
    return (
      <CircularProgress
        id="sign-in-spinner"
        className={classes.spinner}
      />
    );
  }
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>Court Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Descriptions</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(({
            id,
            court_id,
            courts_name,
            date,
            description,
          }) => (
            <TableRow key={id}>
              <TableCell>
                <Link to={`/bookings/${id}`}>
                  {courts_name}
                </Link>
              </TableCell>
              <TableCell align="right">{date}</TableCell>
              <TableCell align="right">{ description }</TableCell>
              <TableCell>
                <DeleteButton
                  className={classes.deleteButton}
                  onClick={() => deleteBooking(headers, court_id, id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

BookingsShowMine.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.object).isRequired,
  getMyBookings: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
  deleteBooking: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bookings: state.bookingsMine,
  headers: state.headers,
});

const mapDispatchToProps = dispatch => ({
  getMyBookings: headers => getMyBookingsAction(dispatch, headers),
  deleteBooking: (headers, courtId, bookingId) => deleteBookingAction(
    dispatch, headers, courtId, bookingId,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingsShowMine);
