import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './JoinPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import { useCreateUser, useUserExist } from '@src/hooks/useUserQuery';
import useModal from '@src/hooks/useModal';
import { isValidPasswd, getErrorText } from '@src/utils/common';
import { GuideText } from '@src/constant/enums';

const INVALID_PASSWD_TEXT = '8~15자, 숫자, 문자 하나 이상 (특수문자 제외)';

const JoinPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const nicknameRef = useRef({} as ParentRef);
  const [modalDesc, setModalDesc] = useState('');
  const [modalTitle, setModalTitle] = useState('알림');
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);

  const { show, hide, RenderModal } = useModal();

  const createUserMutation = useCreateUser();
  const { isLoading, data, refetch } = useUserExist(username);

  const handlePasswd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswd(e.target?.value);
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
    const nickname = nicknameRef.current.get();

    if (!username || !passwd || !nickname) {
      setModalDesc(GuideText.FILL_ALL_FORM);
      show();
      return;
    }

    createUserMutation.mutate(
      { username, passwd, nickname },
      {
        onSuccess: () => {
          setModalDesc('회원가입 성공');
        },
        onError: (error) => {
          setModalDesc(getErrorText(error));
        },
        onSettled: () => {
          show();
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
                <label htmlFor="passwd">
                  <Typography fontSize="md" fontWeight="medium">
                    Password
                  </Typography>
                </label>
                <Input
                  id="passwd"
                  name="passwd"
                  placeholder="passwd"
                  maxWidth
                  password
                  error={passwd.length !== 0 && !isValidPasswd(passwd)}
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

export default JoinPage;
