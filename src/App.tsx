import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';

import Sidebar from '@src/components/common/Sidebar';
import styles from '@src/App.module.scss';

const App = () => {
  return (
    <Switch>
      <div className={styles.App}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </div>
    </Switch>
  );
};

export default App;
