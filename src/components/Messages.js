import './Messages.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Messages({ errors, messages }) {
  return (
    <div>
      {messages.map(message => (
        <div
          className="message"
          key={message}
        >
          {message}
        </div>
      ))}
      {errors.map(errorMessage => (
        <div
          className="error-message"
          key={errorMessage}
        >
          {errorMessage}
        </div>
      ))}
    </div>
  );
}

Messages.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages,
});

export default connect(
  mapStateToProps,
)(Messages);
