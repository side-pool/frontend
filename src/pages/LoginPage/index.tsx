import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './LoginPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import useModal from '@src/hooks/useModal';
import { saveItem, ACCESS_TOKEN } from '@src/utils/storage';
import { useLogin } from '@src/hooks/useAuthQuery';
import { HttpStatusCode } from '@src/constant/enums';
import { getErrorText } from '@src/utils/common';
import { GuideText } from '@src/constant/enums';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);
  const [modalDesc, setModalDesc] = useState('');
  const [modalTitle, setModalTitle] = useState('알림');

  const { show, hide, RenderModal } = useModal();

  const loginMutation = useLogin();

  const submitLoginInfo = (event: React.FormEvent) => {
    event.preventDefault();

    const [username, password] = [
      usernameRef.current.get(),
      passwordRef.current.get(),
    ];

    if (!username || !password) {
      setModalDesc(GuideText.FILL_ALL_FORM);
      show();
      return;
    }

    // submit to sever
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: ({ token }) => {
          saveItem(ACCESS_TOKEN, `${token}`);
          setModalTitle('짝짝짝!');
          setModalDesc('로그인 성공');

          show();
        },
        onError: (error) => {
          if (error.response?.status === HttpStatusCode.UNAUTHORIZED) {
            setModalDesc('아이디 혹은 비밀번호가 틀렸습니다 😅');
          } else {
            setModalDesc(getErrorText(error));
          }
          passwordRef.current.reset();
          show();
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
              maxWidth={true}
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
              maxWidth={true}
              password={true}
              ref={passwordRef}
            />
          </div>
          <Button className={styles.loginButton} primary={true} type="submit">
            로그인
          </Button>
        </form>
        <Link to="/join">
          <Button className={styles.joinButton} variant={'text'}>
            회원가입
          </Button>
        </Link>
      </Card>
      <RenderModal
        headerText={modalTitle}
        footer={{
          submitButton: (
            <Button primary onClick={hide}>
              확인
            </Button>
          ),
        }}
      >
        <Typography
          fontSize={'xs'}
          fontWeight={'regular'}
          textColor="black"
          textAlign="center"
        >
          {modalDesc}
        </Typography>
      </RenderModal>
    </div>
  );
};

export default LoginPage;
