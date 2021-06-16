import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CourtsShowAll from './All';
import CourtsShowMine from './Mine';
import CourtsNew from './New';

const useStyles = makeStyles({
  container: {
    marginTop: '1vh',
    marginBottom: '10vh',
  },
});

function CourtsContent() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Switch>
        <Route exact path="/courts/all" component={() => (<CourtsShowAll />)} />
        <Route exact path="/courts/mine" component={() => <CourtsShowMine />} />
        <Route exact path="/courts/new" component={() => <CourtsNew />} />
      </Switch>
    </div>
  );
}

export default CourtsContent;
