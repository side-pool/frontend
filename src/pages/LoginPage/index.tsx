import React, { useRef, useState } from 'react';
import Typography from '@src/components/common/Typography';
import styles from './LoginPage.module.scss';
import Card from '@src/components/common/Card';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import Modal from '@src/components/common/Modal';
import { saveItem, ACCESS_TOKEN } from '@src/utils/storage';
import { useLogin } from '@src/hooks/useAuthQuery';
import { HttpStatusCode } from '@src/constant/enums';
import { getErrorText } from '@src/utils/common';
import { GuideText } from '@src/constant/enums';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const usernameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const [modalDesc, setModalDesc] = useState('');
  const [modalTitle, setModalTitle] = useState('알림');

  const loginMutation = useLogin();

  const submitLoginInfo = (event: React.FormEvent) => {
    event.preventDefault();

    const [username, password] = [
      usernameRef.current.get(),
      passwordRef.current.get(),
    ];

    if (!username || !password) {
      setModalDesc(GuideText.FILL_ALL_FORM);
      showModal();
      return;
    }

    // submit to sever
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: ({ token }) => {
          saveItem(ACCESS_TOKEN, `${token}`);
          setModalTitle('짝짝짝!');
          setModalDesc('로그인 성공');

          showModal();
        },
        onError: (error) => {
          if (error.response?.status === HttpStatusCode.UNAUTHORIZED) {
            setModalDesc('아이디 혹은 비밀번호가 틀렸습니다 😅');
          } else {
            setModalDesc(getErrorText(error));
          }
          passwordRef.current.reset();
          showModal();
        },
      },
    );
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
              ref={passwordRef}
            />
          </div>
          <Button className={styles.loginButton} primary type="submit">
            로그인
          </Button>
        </form>
        <Link to="/join">
          <Button className={styles.joinButton} variant={'text'}>
            회원가입
          </Button>
        </Link>
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

export default LoginPage;
