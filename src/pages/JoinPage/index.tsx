import React, { useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './JoinPage.module.scss';
import Card from '@src/components/common/Card';
import Input from '@src/components/common/Input';
import Button from '@src/components/common/Button';

const JoinPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    nickname: '',
  });

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
    <div className={styles.JoinPage}>
      <Typography
        fontSize="xxl"
        fontWeight="bold"
        role="heading"
        className="title"
      >
        회원가입
      </Typography>
      <Card className={styles.wideCard}>
        <form onSubmit={submitLoginInfo}>
          <div className={styles.topArea}>
            <div className={styles.infoArea}>
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
              <div className={styles.infoRow}>
                <label htmlFor="nickname">
                  <Typography fontSize="md" fontWeight="medium">
                    Nickname
                  </Typography>
                </label>
                <Input
                  id="nickname"
                  name="nickname"
                  placeholder="nickname"
                  maxWidth={true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button className={styles.checkButton}>중복확인</Button>
          </div>
          <Button className={styles.JoinButton} primary={true} type="submit">
            회원가입
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default JoinPage;
