import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header({ logged }) {
  const signOut = (
    <div>
      <button type="button">Sign Out</button>
    </div>
  );
  const signInAndUp = (
    <div>
      <button type="button"><Link to="/signin">Sign In</Link></button>
      <button type="button"><Link to="/signup">Sign Up</Link></button>
    </div>
  );
  return (
    <div className="header">
      <button type="button"><Link to="/">Home</Link></button>
      { logged ? signOut : signInAndUp}
    </div>
  );
}

Header.propTypes = {
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  logged: !!state.headers,
});

export default connect(
  mapStateToProps,
)(Header);
