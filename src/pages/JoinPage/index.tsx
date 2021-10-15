import React from 'react';
import Typography from '@src/components/common/Typography';
import styles from './JoinPage.module.scss';
import Card from '@src/components/common/Card';
import Input from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { usePostJoin } from '@src/hooks/useUserApi';

const JoinPage = () => {
  const setPostUser = usePostJoin();

  const handleJoin = () => {
    const username = 'test';
    const password = 'qwer1234';
    const nickname = 'text';
    setPostUser.mutate({ username, password, nickname });
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
        <div className={styles.topArea}>
          <div className={styles.infoArea}>
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
            <dl className={styles.infoList}>
              <dt>
                <Typography fontSize="md" fontWeight="medium">
                  Nickname
                </Typography>
              </dt>
              <dd>
                <Input placeholder="nickname" maxWidth={true} />
              </dd>
            </dl>
          </div>
          <Button className={styles.checkButton} primary={true}>
            중복확인
          </Button>
        </div>
        <Button
          className={styles.JoinButton}
          primary={true}
          onClick={() => handleJoin()}
        >
          회원가입
        </Button>
      </Card>
    </div>
  );
};

export default JoinPage;
