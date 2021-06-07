import { Route, Switch } from 'react-router-dom';
import BookingsShowMine from './BookingsShowMine';
import BookingsShowOthers from './BookingsShowOnMyCourts';
import './BookingsContent.scss';

function BookingsContent() {
  return (
    <div className="bookings-content">
      <Switch>
        <Route exact path="/bookings/mybookings" component={() => <BookingsShowMine />} />
        <Route exact path="/bookings/onmycourts" component={() => <BookingsShowOthers />} />
      </Switch>
    </div>
  );
}

export default BookingsContent;
