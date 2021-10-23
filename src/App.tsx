import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';
import JoinPage from './pages/JoinPage';

import Sidebar from '@src/components/common/Sidebar';
import styles from '@src/App.module.scss';

const queryClient = new QueryClient();

const App = () => {
  const { pathname } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <div className={styles.App}>
          <div className={styles.sidebar}>
            <Sidebar pathname={pathname} />
          </div>
          <div className={styles.content}>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/join" component={JoinPage} />
          </div>
        </div>
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
