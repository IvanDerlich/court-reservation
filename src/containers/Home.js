import './Home.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Home({ logged }) {
  if (logged) {
    return <h1 className="home-welcome-message"> Welcome!</h1>;
  }
  return (
    <div className="home">
      <h1>
        Court Reservation
      </h1>
      <p>
        Sign In or Sign Up to access our system
      </p>
    </div>
  );
}

Home.propTypes = {
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  logged: !!state.headers,
});

export default connect(
  mapStateToProps,
)(Home);
