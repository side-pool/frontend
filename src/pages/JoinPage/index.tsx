import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './JoinPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { useCreateUser } from '@src/hooks/useUserApi';
import useModal from '@src/hooks/useModal';

const JoinPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);
  const nicknameRef = useRef({} as ParentRef);
  const [modalText, setModalText] = useState('');
  const [isCheckedId, setIsCheckedId] = useState(false);

  const { show, hide, RenderModal } = useModal();

  const createUserMutation = useCreateUser();

  const checkRedundancy = (event: React.MouseEvent) => {
    const username = usernameRef.current.get();
    if (!username) {
      setModalText('유저네임을 입력해주세요!');
      return;
    }
    // submit to sever

    // TODO: mutation.status 로 분기 나누기

    // success
    setModalText('유효한 유저네임입니다');
    setIsCheckedId(true);

    // failure
    // setModalText('중복된 유저네임입니다');

    show();
  };

  const submitJoinInfo = (event: React.FormEvent) => {
    event.preventDefault();
    // submit to sever

    const [username, password, nickname] = [
      usernameRef.current.get(),
      passwordRef.current.get(),
      nicknameRef.current.get(),
    ];

    if (!username || !password || !nicknameRef) {
      setModalText('값을 모두 입력해주세요');
      show();
      return;
    }

    createUserMutation.mutate({ username, password, nickname });

    // TODO: mutation.status 로 분기 나누기

    // success
    setModalText('회원가입 성공');
    // TODO: redirect

    // failure
    // setModalText('회원 가입 실패');
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
        <form onSubmit={submitJoinInfo}>
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
                  ref={usernameRef}
                  disabled={isCheckedId}
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
                  ref={nicknameRef}
                />
              </div>
            </div>
            <Button className={styles.checkButton} onClick={checkRedundancy}>
              중복확인
            </Button>
          </div>
          <Button
            className={styles.JoinButton}
            primary={true}
            type="submit"
            disabled={!isCheckedId}
            title={'중복확인 해주세요'}
            onClick={show}
          >
            회원가입
          </Button>
        </form>
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

export default JoinPage;
