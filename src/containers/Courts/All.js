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

import getAllCourtsAction from '../../redux/actions/courts/getAll';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  spinner: {
    marginTop: 100,
  },
});

function CourtsShowAll({ courts, getAllCourts, headers }) {
  const classes = useStyles();

  useEffect(() => {
    getAllCourts(headers);
  }, []);

  if (courts.length < 1) {
    return (
      <CircularProgress
        id="sign-in-spinner"
        className={classes.spinner}
      />
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Administrator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courts.map(({
            id,
            name,
            address,
            description,
            first_name,
            last_name,
          }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell align="right">{address}</TableCell>
              <TableCell align="right">{description}</TableCell>
              <TableCell align="right">{`${first_name} ${last_name}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CourtsShowAll.propTypes = {
  courts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllCourts: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  courts: state.allCourts,
  headers: state.headers,
});

const mapDispatchToProps = dispatch => ({
  getAllCourts: headers => getAllCourtsAction(dispatch, headers),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourtsShowAll);
