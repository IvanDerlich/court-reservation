import './Courts.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourtMenu from './CourtsMenu';
import CourtsContent from './CourtsContent';

function Courts({ logged }) {
  // if it's not logged ask the user to log or that he's got access forbiden
  if (!logged) {
    return <div className="courts-error-message"> Unauthorized. Please Log In </div>;
  }
  return (
    <div className="courts-section">
      <h1 className="courts-title">Courts</h1>
      <CourtMenu />
      <CourtsContent />
    </div>
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
