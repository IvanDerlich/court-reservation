/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
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

import getBookingsOnMyCourtsAction from '../../redux/actions/bookings/getBookingsOnMyCourts';

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
});

/* eslint-disable react/no-unescaped-entities */
function BookingsShowMine({ bookings, getBookingsOnMyCourts, headers }) {
  const classes = useStyles();

  useEffect(() => {
    getBookingsOnMyCourts(headers);
  }, []);

  if (bookings.length < 1) {
    return (
      <CircularProgress
        id="sign-in-spinner"
        className={classes.spinner}
      />
    );
  }
  // console.log(bookings);
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>Court Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Booker</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(({
            id,
            booker_id,
            booking_description,
            court_name,
            date,
            first_name,
            last_name,
          }) => (
            <TableRow key={id}>
              <TableCell>
                <Link to={`/court/${id}`}>
                  {court_name}
                </Link>
              </TableCell>
              <TableCell align="right">{date}</TableCell>
              <TableCell align="right">{ booking_description }</TableCell>
              <TableCell align="right">
                <Link to={`/user/${booker_id}`}>
                  {`${first_name} ${last_name}`}
                </Link>
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
  getBookingsOnMyCourts: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  bookings: state.bookingsOnMyCourts,
  headers: state.headers,
});

const mapDispatchToProps = dispatch => ({
  getBookingsOnMyCourts: headers => getBookingsOnMyCourtsAction(dispatch, headers),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingsShowMine);
// export default BookingsShowMine;
