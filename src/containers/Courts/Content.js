import { Route, Switch } from 'react-router-dom';
import CourtsShowAll from './All';
import CourtsShowMine from './Mine';
import CourtsNew from './New';

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
