import './Courts.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Courts({ logged }) {
  // if it's not logged ask the user to log or that he's got access forbiden
  if (!logged) {
    return <div className="courts-error-message"> Unauthorized. Please Log In </div>;
  }
  return (
    <div>
      <h1> Courts </h1>
      <h2> See all courts from all users</h2>
      <h2> See your own courts</h2>
      <h2> Create a court </h2>
    </div>
  );
}

Courts.propTypes = {
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  logged: !!state.headers,
});

export default connect(
  mapStateToProps,
)(Courts);
