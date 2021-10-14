import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';

import Sidebar from '@src/components/common/Sidebar';
import styles from '@src/App.module.scss';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
