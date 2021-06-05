import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
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
