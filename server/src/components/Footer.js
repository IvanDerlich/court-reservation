import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    bottom: '0px',
    position: 'fixed',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    margin: 0,
    left: 0,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar className={classes.footer}>
          <Typography variant="body1" color="inherit">
            <a href="https://ivanderlich.com" alt="Ivan Derlich Website">
              © 2021 Ivan Derlich
            </a>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
