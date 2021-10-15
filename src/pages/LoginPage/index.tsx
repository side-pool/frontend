import React from 'react';
import Typography from '@src/components/common/Typography';
import styles from './LoginPage.module.scss';
import Card from '@src/components/common/Card';
import Input from '@src/components/common/Input';
import Button from '@src/components/common/Button';

import { useGetUserInfo, useLoginUser } from '@src/hooks/useUserApi';

const LoginPage = () => {
  const { data, error, isError } = useGetUserInfo();
  const setLoginUser = useLoginUser();

  const handleLogin = () => {
    const username = 'username1';
    const password = 'password1';

    setLoginUser.mutate({ username, password });
  };

  console.log(data, error, isError);

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
        <dl className={styles.infoList}>
          <dt>
            <Typography fontSize="md" fontWeight="medium">
              Username
            </Typography>
          </dt>
          <dd>
            <Input placeholder="username" maxWidth={true} />
          </dd>
        </dl>
        <dl className={styles.infoList}>
          <dt>
            <Typography fontSize="md" fontWeight="medium">
              Password
            </Typography>
          </dt>
          <dd>
            <Input placeholder="password" maxWidth={true} />
          </dd>
        </dl>
        <Button
          className={styles.loginButton}
          primary={true}
          onClick={() => handleLogin()}
        >
          로그인
        </Button>
        <Button className={styles.joinButton} variant={'text'}>
          회원가입
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
