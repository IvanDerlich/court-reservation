import { Route, Switch } from 'react-router-dom';
import BookingsShowMine from './BookingsShowMine';
import BookingsShowFromMyCourts from './BookingsShowFromMyCourts';
import './BookingsContent.scss';

function BookingsContent() {
  return (
    <div className="bookings-content">
      <Switch>
        <Route exact path="/bookings/mine" component={() => <BookingsShowMine />} />
        <Route exact path="/bookings/ofmycourts" component={() => <BookingsShowFromMyCourts />} />
      </Switch>
    </div>
  );
}

export default BookingsContent;
