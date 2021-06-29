import { useLocation, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const PageNotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h1>
        { `Page not found: ${location.pathname}` }
      </h1>
      <Typography variant="h5" color="initial">
        <Link to="/">Return to home page</Link>
      </Typography>
      <Typography variant="h5" color="initial">
        <Link to="/courts">Return to courts</Link>
      </Typography>
      <Typography variant="h5" color="initial">
        <Link to="/bookings">Return to bookings</Link>
      </Typography>
    </div>
  );
};

export default PageNotFound;
