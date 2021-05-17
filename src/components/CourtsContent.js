/* eslint-disable no-unused-vars */
import { Route, Switch } from 'react-router-dom';
import CourtsShowAll from './CourtsShowAll';
import CourtsShowMine from './CourtsShowMine';
import CourtsNew from './CourtsNew';
import './CourtsContent.scss';

function CourtsContent() {
  return (
    <div className="courts-content">
      <Switch>
        <Route exact path="/courts/all" component={() => (<CourtsShowAll />)} />
        <Route exact path="/courts/mine" component={() => <CourtsShowMine />} />
        <Route exact path="/courts/new" component={() => <CourtsNew />} />
      </Switch>
    </div>
  );
}

export default CourtsContent;
