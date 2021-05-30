// import './Home.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '30px 40px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    color: '#352d2d',
  },
  content: {
    height: '100vh',
  },
}));

function Home({ logged }) {
  const classes = useStyles();
  if (logged) {
    return <h1 className={classes.welcome}> Welcome!</h1>;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} className={classes.content}>
          <Paper className={classes.paper}>
            <Typography variant="h3" gutterBottom color="yellow" className={classes.title}>
              Court Reservation
            </Typography>
            <Button variant="contained">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button variant="contained" color="Seconday">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Paper>
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
