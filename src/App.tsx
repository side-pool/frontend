import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '@src/pages/LandingPage';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  );
};

export default App;
