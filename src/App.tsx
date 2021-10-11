import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
};

export default App;
