import { Link } from 'react-router-dom';
import './CourtsMenu.scss';

function CourtsMenu() {
  return (
    <div className="vertical-menu">
      <Link to="/courts/mine"><h2> See your own courts</h2></Link>
      <Link to="/courts/new"><h2> Create a court </h2></Link>
      <Link to="/courts/all"><h2> See all courts from all users</h2></Link>
    </div>
  );
}

export default CourtsMenu;
