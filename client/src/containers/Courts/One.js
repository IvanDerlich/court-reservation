/* eslint-disable camelcase */
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import getOneCourtAction from '../../redux/actions/courts/getOne';
import NewBookingForm from '../Bookings/New';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

function One(
  { getCourt },
) {
  const classes = useStyles();
  const { courtId } = useParams();
  const court = getCourt(courtId);
  const [displayBookingForm, setDisplayBookingForm] = useState(false);
  const {
    // id,
    name, address, description, first_name, last_name,
  } = court;

  const handleBookCourtClick = () => {
    setDisplayBookingForm(!displayBookingForm);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h2" component="h2">
            {name}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Address:
          </Typography>
          <Typography variant="h5" component="h2">
            {address}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Administrator:
          </Typography>
          <Typography variant="h5" component="h2">
            {` ${first_name} ${last_name}`}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleBookCourtClick()}>Book Court</Button>
        </CardActions>
      </Card>
      <br />
      <Card className={classes.root} variant="outlined">
        {displayBookingForm && <NewBookingForm courtId={courtId} />}
      </Card>
    </>
  );
}

One.propTypes = {
  getCourt: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getCourt: courtId => getOneCourtAction(state, courtId),
});

export default connect(
  mapStateToProps,
)(One);
