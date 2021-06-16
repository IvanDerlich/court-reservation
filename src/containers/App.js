import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// custom
import Navbar from './Navbar';
import SignInForm from './LogForms/In';
import SignUpForm from './LogForms/Up';
import Messages from './Messages';
import Courts from './Courts/Index';
import Bookings from './Bookings/Index';
import './App.scss';

// containers
import Footer from '../components/Footer';
import Home from '../components/Home';

const useStyles = makeStyles(() => ({
  // mainSection: {
  //   top: '10vh',
  // marginBottom: '10vh',
  // },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Navbar />
      <div className={classes.mainSection}>
        <Messages />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/signin" component={() => <SignInForm />} />
          <Route exact path="/signup" component={() => <SignUpForm />} />
          <Route path="/courts" component={() => <Courts />} />
          <Route path="/bookings" component={() => <Bookings />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
