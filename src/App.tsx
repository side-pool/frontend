import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styles from '@src/App.module.scss';
import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';
import JoinPage from '@src/pages/JoinPage';
import IdeaPage from '@src/pages/IdeaPage';
import Sidebar from '@src/components/common/Sidebar';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import AuthRoute from '@src/components/common/AuthRouter';

const App = () => {
  const { pathname } = useLocation();
  const { isSuccess } = useCheckAuth();

  return (
    <Switch>
      <div className={styles.App}>
        <div className={styles.sidebar}>
          <Sidebar pathname={pathname} />
        </div>
        <div className={styles.content}>
          <Route exact path="/" component={LandingPage} />
          <AuthRoute
            path="/login"
            component={LoginPage}
            isAuth={!isSuccess}
            redirectPath="/"
          />
          <AuthRoute
            path="/join"
            component={JoinPage}
            isAuth={!isSuccess}
            redirectPath="/"
          />
          <Route path="/idea" component={IdeaPage} />
        </div>
      </div>
    </Switch>
  );
};

export default App;
