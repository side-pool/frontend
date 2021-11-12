import React, { useRef } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styles from '@src/App.module.scss';
import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';
import JoinPage from '@src/pages/JoinPage';
import IdeaPage from '@src/pages/IdeaPage';
import SidePage from '@src/pages/SidePage';
import SideCreatePage from '@src/pages/SideCreatePage';
import SideEditPage from '@src/pages/SideEditPage';
import MyPage from '@src/pages/MyPage';
import Sidebar from '@src/components/common/Sidebar';
import { useAuth } from '@src/hooks/useUserQuery';
import AuthRoute from '@src/components/common/AuthRouter';
import SideReadPage from '@src/pages/SideReadPage';

const App = () => {
  const { pathname } = useLocation();
  const { data: isAuth } = useAuth();

  const pageRef = useRef<HTMLInputElement>(null);

  const handleToTop = () => {
    pageRef.current?.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  return (
    <Switch>
      <div className={styles.App}>
        <div className={styles.sidebar}>
          <Sidebar pathname={pathname} />
        </div>
        <div className={styles.content} ref={pageRef}>
          <Route exact path="/" component={LandingPage} />
          <AuthRoute
            path="/login"
            component={LoginPage}
            isAuth={!isAuth}
            redirectPath="/"
          />
          <AuthRoute
            path="/join"
            component={JoinPage}
            isAuth={!isAuth}
            redirectPath="/"
          />
          <Route path="/idea">
            <IdeaPage handleToTop={handleToTop} />
          </Route>
          <Route exact path="/side">
            <SidePage handleToTop={handleToTop} />
          </Route>
          <Route exact path="/side/:id">
            <SideReadPage handleToTop={handleToTop} />
          </Route>
          <Route exact path="/side-create">
            <SideCreatePage handleToTop={handleToTop} />
          </Route>
          <Route exact path="/side/edit/:id">
            <SideEditPage handleToTop={handleToTop} />
          </Route>
          <AuthRoute
            path="/mypage"
            isAuth={isAuth}
            redirectPath="/"
            render={(props) => <MyPage {...props} handleToTop={handleToTop} />}
          />
        </div>
      </div>
    </Switch>
  );
};

export default App;
