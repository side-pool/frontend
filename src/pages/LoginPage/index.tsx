import React, { useState } from 'react';
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
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const submitLoginInfo = () => {
    // submit to sever
    alert(Object.entries(form).map(([key, value]) => `\n${key} : ${value}`));
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
              onChange={handleChange}
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
              type={'password'}
              onChange={handleChange}
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
