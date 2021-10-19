import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';
import JoinPage from './pages/JoinPage';

import Sidebar from '@src/components/common/Sidebar';
import styles from '@src/App.module.scss';
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
            <Route path="/join" component={JoinPage} />
          </div>
        </div>
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
