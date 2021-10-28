import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import styles from '@src/App.module.scss';

import AuthRoute from '@src/components/common/AuthRouter';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';
import JoinPage from '@src/pages/JoinPage';
import IdeaPage from '@src/pages/IdeaPage';
import SidePage from '@src/pages/SidePage';

import Sidebar from '@src/components/common/Sidebar';

import { getApiInstance } from '@src/utils/context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        if (typeof url === 'string') {
          const { data } = await getApiInstance().get(url);
          return data;
        }
        throw new Error('Invalid QueryKey');
      },
    },
  },
});

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
            <AuthRoute path="/idea" component={IdeaPage} />
            <AuthRoute path="/side" component={SidePage} />
          </div>
        </div>
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
