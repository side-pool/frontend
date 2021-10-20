import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import styles from '@src/App.module.scss';

import LandingPage from '@src/pages/LandingPage';
import LoginPage from '@src/pages/LoginPage';
import JoinPage from '@src/pages/JoinPage';
import IdeaPage from '@src/pages/IdeaPage';

import Sidebar from '@src/components/common/Sidebar';

import Modal from '@src/components/common/Modal';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';

import { useAppDispatch, useUiState, hideAlertModal } from '@src/store';

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
  const dispatch = useAppDispatch();
  const { alertModalIsVisible, alertModalTitle, alertModalContent } =
    useUiState();

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <div className={styles.App}>
          <Modal
            closeModal={() => dispatch(hideAlertModal())}
            headerText={alertModalTitle}
            footer={{
              submitButton: (
                <Button primary onClick={() => dispatch(hideAlertModal())}>
                  확인
                </Button>
              ),
            }}
            isVisible={alertModalIsVisible || false}
          >
            <Typography
              fontSize="xs"
              fontWeight="regular"
              textColor="black"
              textAlign="center"
            >
              {alertModalContent}
            </Typography>
          </Modal>

          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/join" component={JoinPage} />
            <Route path="/idea" component={IdeaPage} />
          </div>
        </div>
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
