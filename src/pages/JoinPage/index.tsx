import React, { useEffect, useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './JoinPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { useCreateUser, useUserExist } from '@src/hooks/useUserQuery';
import { isValidPasswd, getErrorText } from '@src/utils/common';
import { GuideText } from '@src/constant/enums';
import { useHistory } from 'react-router-dom';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/AlertModal';

const INVALID_PASSWD_TEXT = '8~15자, 숫자, 문자 하나 이상 (특수문자 제외)';

const JoinPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const nicknameRef = useRef({} as ParentRef);

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  const createUserMutation = useCreateUser();

  // TODO: 초기값 넣어줄 수 있을듯
  const userExistResult = useUserExist(username, (data: boolean) => {
    showAlert(
      data ? '중복된 username 입니다.' : '사용 가능한 username 입니다.',
    );
  });

  const handleConfirm = () => {
    hideAlert();
    if (createUserMutation.isSuccess) {
      history.push('/');
    }
  };

  const handlePasswd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target?.value);
  };

  const checkRedundancy = () => {
    const curUsername = usernameRef.current.get();
    if (!curUsername) {
      showAlert('유저네임을 입력해주세요!');
      return;
    }

    // submit to sever
    setUsername(curUsername);
  };

  const submitJoinInfo = (event: React.FormEvent) => {
    event.preventDefault();
    // submit to sever
    const [username, nickname] = [
      usernameRef.current.get(),
      nicknameRef.current.get(),
    ];

    if (!username || !password || !nickname) {
      showAlert(GuideText.FILL_ALL_FORM);
      return;
    }

    createUserMutation.mutate(
      { username, password, nickname },
      {
        onSuccess: () => {
          showAlert('회원가입 성공');
        },
        onError: (error) => {
          showAlert(getErrorText(error));
        },
      },
    );
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
                  error={password.length !== 0 && !isValidPasswd(password)}
                  errorMessage={INVALID_PASSWD_TEXT}
                  onChange={handlePasswd}
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
                  maxWidth
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
            primary
            type="submit"
            disabled={userExistResult.data ?? true}
          >
            회원가입
          </Button>
        </form>
      </Card>
      {isAlertVisible && (
        <>
          <AlertModal content={alertMessage} handleConfirm={handleConfirm} />
        </>
      )}
    </div>
  );
};

export default JoinPage;
