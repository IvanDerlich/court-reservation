import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import All from './All';
import Mine from './Mine';
import New from './New';
import ShowOne from './One';

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
        <Route exact path="/courts/all" component={All} />
        <Route exact path="/courts/mine" component={Mine} />
        <Route exact path="/courts/new" component={New} />
        <Route exact path="/courts/:symbol" component={() => <ShowOne />} />
      </Switch>
    </div>
  );
}

export default CourtsContent;
