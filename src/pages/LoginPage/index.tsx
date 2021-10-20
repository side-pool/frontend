import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './LoginPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { useLogin } from '@src/hooks/useAuth';
import useModal from '@src/hooks/useModal';

const LoginPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);
  const [modalText, setModalText] = useState('');

  const { show, hide, RenderModal } = useModal();
  const loginMutation = useLogin();

  const submitLoginInfo = (event: React.FormEvent) => {
    event.preventDefault();

    const [username, password] = [
      usernameRef.current.get(),
      passwordRef.current.get(),
    ];

    if (!username || !password) {
      setModalText('값을 모두 입력해주세요');
      show();
      return;
    }
    // alert(`${usernameRef.current.get()}, ${passwordRef.current.get()}`);

    // submit to sever
    loginMutation.mutate({ username, password });

    if (loginMutation.isError) {
      // TODO: isError 가 확인이 안 됨
      setModalText('알 수 없는 에러');
    } else if (loginMutation.isSuccess) {
      setModalText('로그인 성공');
    }

    console.log(loginMutation.status);
    show();
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
        <Button className={styles.joinButton} variant={'text'}>
          회원가입
        </Button>
      </Card>
      <RenderModal
        footer={{
          submitButton: (
            <Button primary onClick={hide}>
              확인
            </Button>
          ),
        }}
      >
        <>{modalText}</>
      </RenderModal>
    </div>
  );
};

export default LoginPage;
