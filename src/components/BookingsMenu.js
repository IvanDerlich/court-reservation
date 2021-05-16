import { Link } from 'react-router-dom';
import './BookingsMenu.scss';

function BookingsMenu() {
  return (
    <div className="vertical-menu">
      <Link to="/bookings/mine"><h2> My bookings</h2></Link>
      <Link to="/bookings/ofmycourts"><h2> Bookings on my courts </h2></Link>
    </div>
  );
}

export default BookingsMenu;
