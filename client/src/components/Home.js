// import './Home.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import loggedImage from '../resources/logged-Image.jpg';
import notLoggedImage from '../resources/logged-Image2.jpg';

const useStyles = makeStyles(() => ({
  title: {
    color: '#352d2d',
    marginTop: '20px',
  },
  welcomeTitle: {
    marginTop: '46px',
    color: 'white',
  },
  root: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    width: '90vw',
    height: '90vh',
  },
  loggedWelcome: {
    marginTop: '1.5vh',
    width: '100%',
    backgroundImage: `url(${loggedImage})`,
  },
  notLoggedWelcome: {
    marginTop: '1.5vh',
    width: '100%',
    backgroundImage: `url(${notLoggedImage})`,
  },
}));

function Home({ logged }) {
  const classes = useStyles();
  if (logged) {
    return (
      <div className={`${classes.root} ${classes.loggedWelcome}`}>
        <Grid container spacing={3} justify="flex-end" alignItems="center">
          <Grid item xs={6} className={classes.content}>
            <Typography variant="h2" className={classes.welcomeTitle}>
              WELCOME!
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div className={`${classes.root} ${classes.notLoggedWelcome}`}>
      <Grid container spacing={3} justify="flex-start" alignItems="center">
        <Grid item xs={6} className={classes.content}>
          <Typography variant="h3" className={classes.title}>
            Court Reservation
          </Typography>
          <Button variant="contained">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button variant="contained">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </Grid>
      </Grid>
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
