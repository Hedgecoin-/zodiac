import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Rankings from './pages/Rankings';


function App() {
  return (
    <Switch>
      <Route path='/profile' component={Profile} />
      <Route path='/login' component={Login} />
      <Route component={Rankings} />
    </Switch>
  )
}
export default App;
