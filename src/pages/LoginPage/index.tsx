import React, { useRef } from 'react';
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
import { Link } from 'react-router-dom';

import { useAppDispatch, showAlertModal } from '@src/store';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);

  const loginMutation = useLogin();

  const submitLoginInfo = (event: React.FormEvent) => {
    event.preventDefault();

    const [username, password] = [
      usernameRef.current.get(),
      passwordRef.current.get(),
    ];

    if (!username || !password) {
      dispatch(
        showAlertModal({
          alertModalContent: GuideText.FILL_ALL_FORM,
        }),
      );
      return;
    }

    // submit to sever
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: ({ token }) => {
          saveItem(ACCESS_TOKEN, `${token}`);

          dispatch(
            showAlertModal({
              alertModalTitle: '짝짝짝!',
              alertModalContent: '로그인 성공',
            }),
          );
        },
        onError: (error) => {
          if (error.response?.status === HttpStatusCode.UNAUTHORIZED) {
            dispatch(
              showAlertModal({
                alertModalContent: '아이디 혹은 비밀번호가 틀렸습니다 😅',
              }),
            );
          } else {
            dispatch(
              showAlertModal({
                alertModalContent: getErrorText(error),
              }),
            );
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
          <Button className={styles.joinButton} variant={'text'}>
            회원가입
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;
