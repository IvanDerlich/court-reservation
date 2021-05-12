import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Navbar from './Navbar';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-section">
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/signin" component={() => <SignInForm />} />
          <Route exact path="/signup" component={() => <SignUpForm />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
