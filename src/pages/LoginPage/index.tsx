import React, { useRef } from 'react';
import { useQueryClient } from 'react-query';
import Typography from '@src/components/common/Typography';
import styles from './LoginPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { saveItem, ACCESS_TOKEN } from '@src/utils/storage';
import { useLogin } from '@src/hooks/useAuthQuery';
import { HttpStatusCode } from '@src/constant/enums';
import { getErrorText } from '@src/utils/common';
import { GuideText } from '@src/constant/enums';
import { Link, useHistory } from 'react-router-dom';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';

const LoginPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);
  const history = useHistory();
  const queryClient = useQueryClient();

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const loginMutation = useLogin();

  const handleConfirm = () => {
    hideAlert();
    if (loginMutation.isSuccess) {
      history.push('/side');
      queryClient.invalidateQueries(`/auth`);
    }
  };

  const submitLoginInfo = (event: React.FormEvent) => {
    event.preventDefault();

    const [username, password] = [
      usernameRef.current.get(),
      passwordRef.current.get(),
    ];

    if (!username || !password) {
      showAlert(GuideText.FILL_ALL_FORM);
      return;
    }

    // submit to sever
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: ({ token }) => {
          saveItem(ACCESS_TOKEN, `${token}`);

          showAlert('로그인 성공');
          // 로그인 상태 업데이트
        },
        onError: (error) => {
          if (error.response?.status === HttpStatusCode.UNAUTHORIZED) {
            showAlert('아이디 또는 비밀번호가 잘못 입력 되었습니다 😅');
          } else {
            showAlert(getErrorText(error));
          }
          passwordRef.current.reset();
        },
      },
    );
  };

  return (
    <div className={styles.LoginPage}>
      <Typography
        fontSize="xxl"
        fontWeight="bold"
        role="heading"
        className="title"
      >
        로그인
      </Typography>
      <Card className={styles.wideCard}>
        <form onSubmit={submitLoginInfo}>
          <div className={styles.infoRow}>
            <label htmlFor="username">
              <Typography fontSize="md" fontWeight="medium">
                Username
              </Typography>
            </label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              maxWidth
              ref={usernameRef}
            />
          </div>
          <div className={styles.infoRow}>
            <label htmlFor="password">
              <Typography fontSize="md" fontWeight="medium">
                Password
              </Typography>
            </label>
            <Input
              id="password"
              name="password"
              placeholder="password"
              maxWidth
              password
              ref={passwordRef}
            />
          </div>
          <Button className={styles.loginButton} primary type="submit">
            로그인
          </Button>
        </form>
        <Link to="/join">
          <Button className={styles.joinButton} variant="text">
            회원가입
          </Button>
        </Link>
      </Card>
      {isAlertVisible && (
        <>
          <AlertModal content={alertMessage} handleConfirm={handleConfirm} />
        </>
      )}
    </div>
  );
};

export default LoginPage;
