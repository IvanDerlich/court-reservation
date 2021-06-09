// import './Messages.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  centerText: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function Messages({ errors, messages }) {
  const classes = useStyles();
  return (
    <div>
      {messages.map(message => (
        <Alert
          severity="success"
          className={classes.centerText}
          // className="message"
          key={message}
        >
          {message}
        </Alert>
      ))}
      {errors.map(errorMessage => (
        <Alert
          severity="error"
          // className="error-message"
          key={errorMessage}
        >
          {errorMessage}
        </Alert>
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
