import { Route, Switch } from 'react-router-dom';
import BookingsShowMine from './Mine';
import BookingsShowOthers from './OnMine';
import NewCourtForm from './New';

function BookingsContent() {
  return (
    <div className="bookings-content">
      <Switch>
        <Route exact path="/bookings/mybookings" component={() => <BookingsShowMine />} />
        <Route exact path="/bookings/onmycourts" component={() => <BookingsShowOthers />} />
        <Route exact path="/bookings/new/:courtId" component={NewCourtForm} />
      </Switch>
    </div>
  );
}

export default BookingsContent;
