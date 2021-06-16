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
import DeleteButton from '@material-ui/icons/DeleteOutlined';

import getMyCourtsAction from '../../redux/actions/courts/getMine';

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

function CourtsShowMine({
  courts, getMyCourts, headers, deleteCourt,
}) {
  const classes = useStyles();

  useEffect(() => {
    getMyCourts(headers);
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
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courts.map(({
            id,
            name,
            address,
            description,
          }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell align="right">{address}</TableCell>
              <TableCell align="right">{description}</TableCell>
              <TableCell>
                <DeleteButton
                  className={classes.deleteButton}
                  onClick={() => deleteCourt()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CourtsShowMine.propTypes = {
  courts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getMyCourts: PropTypes.func.isRequired,
  deleteCourt: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  headers: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  courts: state.myCourts,
  headers: state.headers,
});

const mapDispatchToProps = dispatch => ({
  getMyCourts: headers => getMyCourtsAction(dispatch, headers),
  deleteCourt: () => console.log('Click'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourtsShowMine);
