import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './LoginPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';

import { useGetUserInfo, useLoginUser } from '@src/hooks/useUserApi';

const LoginPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);

  const { data, error, isError } = useGetUserInfo();
  const setLoginUser = useLoginUser();

  const submitLoginInfo = (event: React.FormEvent) => {
    event.preventDefault();
    // submit to sever
    alert(`${usernameRef.current.get()}, ${passwordRef.current.get()}`);
    const username = usernameRef.current.get();
    const password = passwordRef.current.get();

    setLoginUser.mutate({ username, password });
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
    </div>
  );
};

export default LoginPage;
