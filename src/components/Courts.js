import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { Link } from 'react-router-dom';

// import CourtMenu from './CourtsMenu';
import CourtsContent from './CourtsContent';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  paper: {
    // marginRight: theme.spacing(2),
    margin: '30px',
  },
}));

function Courts({ logged }) {
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
        <Typography variant="h4" className="courts-title">Courts</Typography>
        <MenuList>
          <MenuItem>
            <Link to="/courts/all">
              All courts
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/courts/mine">
              My courts
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/courts/new">
              Create Court
            </Link>
          </MenuItem>
        </MenuList>
      </Paper>
      <CourtsContent />
    </Grid>
  );
}

Courts.propTypes = {
  logged: PropTypes.bool.isRequired,
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
  // logged: !!state.headers,
  logged: true,
});

export default connect(
  mapStateToProps,
)(Courts);
