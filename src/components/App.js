import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Navbar from './Navbar';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Messages from './Messages';
import Courts from './Courts';
import Bookings from './Bookings';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-section">
        <Messages />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/signin" component={() => <SignInForm />} />
          <Route exact path="/signup" component={() => <SignUpForm />} />
          <Route exact path="/courts" component={() => <Courts />} />
          <Route exact path="/bookings" component={() => <Bookings />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
