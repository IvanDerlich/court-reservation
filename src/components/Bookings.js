import './Bookings.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BookingsMenu from './BookingsMenu';
import BookingsContent from './BookingsContent';

function Bookings({ logged }) {
  if (!logged) {
    return <div className="courts-error-message"> Unauthorized. Please Log In </div>;
  }
  return (
    <div className="bookings-section">
      <h1 className="bookings-title">Bookings</h1>
      <BookingsMenu />
      <BookingsContent />
    </div>
  );
}

Bookings.propTypes = {
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  logged: !!state.headers,
});

export default connect(
  mapStateToProps,
)(Bookings);
