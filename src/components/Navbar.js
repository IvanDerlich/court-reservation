/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import signOutAction from '../redux/actions/auth/signOut';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tab: {
    margin: '15px',
  },
}));

function Navbar({ logged, signOut }) {
  // eslint-disable-next-line no-param-reassign
  // logged = true;
  const classes = useStyles();

  function handleSignOut() {
    signOut();
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Box display="flex" justifyContent="flex-end">
          <Typography className={classes.tab}>
            <Link to="/">Home</Link>
          </Typography>
          { logged && (
            <>
              <Typography className={classes.tab}>
                <Link to="/courts">Courts</Link>
              </Typography>
              <Typography className={classes.tab}>
                <Link to="/bookings">Bookings</Link>
              </Typography>
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="flex-start">
          { logged ? (
            <>
              <Button color="inherit">
                <div onClick={handleSignOut}>Sign Out</div>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button color="inherit">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  logged: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  logged: !!state.headers,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => signOutAction(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
