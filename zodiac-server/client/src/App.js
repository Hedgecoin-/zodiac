import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Rankings from './pages/Rankings';
import Spellbook from './pages/Spellbook';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}))

function App() {
  const classes = useStyles();

  return (
    <Route path='/' render={({ location }) => (
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs value={location.pathname} variant='fullWidth'>
            <Tab label='Rankings' value='/' component={Link} to='/' />
            <Tab label='Profile' value='/profile' component={Link} to='/profile' />
            <Tab label='Spellbook' value='/spellbook' component={Link} to='/spellbook' />
          </Tabs>
        </AppBar>
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/login' component={Login} />
          <Route path='/spellbook' component={Spellbook} />
          <Route component={Rankings} />
        </Switch>
      </div>
    )}
    />
  )
}
export default App;
