import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Header from './Header';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/signin" component={() => <SignInForm />} />
        <Route exact path="/signup" component={() => <SignUpForm />} />
        <button type="submit">Sign In</button>
        <button type="submit">Sign Up</button>
      </Switch>
    </div>
  );
}

export default App;
