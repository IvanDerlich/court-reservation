/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import signOutAction from '../redux/actions/signOut';

function Navbar({ logged, signOut }) {
  function handleSignOut() {
    signOut();
  }
  const signOutHTML = (
    <div className="navbar-item">
      <div onClick={handleSignOut}>Sign Out</div>
    </div>
  );
  const signIn = (
    <div className="navbar-item">
      <Link to="/signin">Sign In</Link>
    </div>
  );
  const signUp = (
    <div className="navbar-item">
      <Link to="/signup">Sign Up</Link>
    </div>
  );
  const courts = (
    <div className="navbar-item">
      <Link to="/courts">Courts</Link>
    </div>
  );
  const bookings = (
    <div className="navbar-item">
      <Link to="/bookings">Bookings</Link>
    </div>
  );

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-item">
          <Link to="/">Home</Link>
        </div>
        { logged && courts}
        { logged && bookings}
      </div>
      <div className="navbar-right">
        { logged && signOutHTML}
        { !logged && signIn }
        { !logged && signUp }
      </div>
    </div>
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
