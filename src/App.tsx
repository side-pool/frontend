import React, { useRef } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import styles from '@src/App.module.scss';
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
import AlertModal from '@src/components/modals/AlertModal';
import {
  useAppDispatch,
  useUiState,
  hideGlobalAlert,
  showGlobalAlert,
} from '@src/store';
import MobileSidebar from './components/mobile/MobileSidebar';
import Gnb from '@src/components/mobile/Gnb';
import useModalControl from '@src/hooks/useModalControl';
import SideGithubModal from '@src/components/modals/SideGithubModal';
import IdeaFormModal from '@src/components/modals/IdeaFormModal';

const PATH_CHECK = ['login', 'join', 'idea', 'side', 'mypage'];

const App = () => {
  const { isGlobalAlertVisible, globalAlertMessage } = useUiState();

  const {
    isModalVisible: isGithubVisible,
    showModal: showGithubModal,
    hideModal: hideGithubModal,
  } = useModalControl();

  const {
    isModalVisible: isIdeaFormVisible,
    showModal: showIdeaForm,
    hideModal: hideIdeaForm,
  } = useModalControl();

  const dispatch = useAppDispatch();
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
        <Gnb
          pathname={pathname}
          showGithubModal={showGithubModal}
          showIdeaForm={showIdeaForm}
        />
        <div className={styles.content} ref={pageRef}>
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
            <IdeaPage handleToTop={handleToTop} showIdeaForm={showIdeaForm} />
          </Route>
          <Route exact path="/side">
            <SidePage
              handleToTop={handleToTop}
              isGithubVisible={isGithubVisible}
              showGithubModal={showGithubModal}
            />
          </Route>
          <Route exact path="/side/:id">
            <SideReadPage handleToTop={handleToTop} />
          </Route>
          <Route exact path="/side/create">
            <SideCreatePage handleToTop={handleToTop} />
          </Route>
          <Route exact path="/side/edit/:id">
            <SideEditPage handleToTop={handleToTop} />
          </Route>
          <AuthRoute
            path="/mypage"
            isAuth={isAuth}
            redirectPath="/login"
            render={(props) => <MyPage {...props} handleToTop={handleToTop} />}
          />
          {pathname && !PATH_CHECK.some((each) => pathname.includes(each)) && (
            <Redirect to="/side" />
          )}
        </div>
        <div className={styles.mobileSidebar}>
          <MobileSidebar pathname={pathname} />
        </div>
        {isGlobalAlertVisible && (
          <AlertModal
            content={globalAlertMessage}
            handleConfirm={() => {
              dispatch(hideGlobalAlert());
            }}
          />
        )}
        {isGithubVisible && (
          <SideGithubModal
            hideModal={hideGithubModal}
            showAlert={(title) =>
              dispatch(showGlobalAlert({ globalAlertMessage: title }))
            }
          />
        )}
        {isIdeaFormVisible && (
          <IdeaFormModal
            hideIdeaForm={hideIdeaForm}
            showAlert={(title) =>
              dispatch(showGlobalAlert({ globalAlertMessage: title }))
            }
            isCreate
          />
        )}
      </div>
    </Switch>
  );
};

export default App;
