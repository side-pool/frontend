import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './JoinPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { useCreateUser, useUserExist } from '@src/hooks/useUserQuery';
import Modal from '@src/components/common/Modal';
import { isValidPasswd, getErrorText } from '@src/utils/common';
import { GuideText } from '@src/constant/enums';

const INVALID_PASSWD_TEXT = '8~15자, 숫자, 문자 하나 이상 (특수문자 제외)';

const JoinPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const nicknameRef = useRef({} as ParentRef);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const [modalDesc, setModalDesc] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('알림');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidUsername, setIsValidUsername] = useState(false);

  const createUserMutation = useCreateUser();
  const { isLoading, data, refetch } = useUserExist(username);

  const handlePasswd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target?.value);
  };

  const checkRedundancy = () => {
    const curUsername = usernameRef.current.get();
    if (!curUsername) {
      setModalDesc('유저네임을 입력해주세요!');
      return;
    }

    // submit to sever

    setUsername(curUsername);
    refetch();

    // TODO: query result status 로 분기 나누기

    // setModalTitle(...)
    // setModalDesc('...');
    // setIsValidUsername(...)
    // show();
    // history.push("/login")
  };

  const submitJoinInfo = (event: React.FormEvent) => {
    event.preventDefault();
    // submit to sever
    const [username, nickname] = [
      nicknameRef.current.get(),
      usernameRef.current.get(),
    ];

    if (!username || !password || !nickname) {
      setModalDesc(GuideText.FILL_ALL_FORM);
      showModal();
      return;
    }

    createUserMutation.mutate(
      { username, password, nickname },
      {
        onSuccess: () => {
          setModalDesc('회원가입 성공');
        },
        onError: (error) => {
          setModalDesc(getErrorText(error));
        },
        onSettled: () => {
          showModal();
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
                  disabled={isValidUsername}
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
            // disabled={!isValidUsername}
            title={isValidUsername ? '회원가입' : '중복확인 해주세요'}
          >
            회원가입
          </Button>
        </form>
      </Card>
      <Modal
        closeModal={hideModal}
        headerText={modalTitle}
        footer={{
          submitButton: (
            <Button primary onClick={hideModal}>
              확인
            </Button>
          ),
        }}
        isVisible={isModalVisible}
      >
        <Typography
          fontSize={'xs'}
          fontWeight={'regular'}
          textColor="black"
          textAlign="center"
        >
          {modalDesc}
        </Typography>
      </Modal>
    </div>
  );
};

export default JoinPage;
