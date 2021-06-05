import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Messages from './Messages';
import Courts from './Courts';
import Bookings from './Bookings';
import './App.scss';
// containers
import Footer from '../containers/Footer';
import Home from '../containers/Home';

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
          <Route path="/courts" component={() => <Courts />} />
          <Route path="/bookings" component={() => <Bookings />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
