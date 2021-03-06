import Button from '@src/components/common/Button';

import cn from 'classnames';
import UserInfoCard from '@src/components/UserInfoCard';
import Typography from '@src/components/common/Typography';
import React, { useRef, useState } from 'react';
import styles from './MyPage.module.scss';
import {
  useAuth,
  useGetUser,
  useUpdateNickname,
  useUpdatePassword,
} from '@src/hooks/useUserQuery';
import MySideList from '@src/components/MySideList';
import { useReadAlarm } from '@src/hooks/useMyPageQuery';
import MyIdeaList from '@src/components/Idea/MyIdeaList';
import MyCommentList from '@src/components/Comment/MyCommentList';
import AlarmCardContainer from '@src/components/AlarmCardContainer';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import Input, { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import { isValidPasswd } from '@src/utils/common';

const INVALID_PASSWD_TEXT = '비밀번호는 숫자, 문자 포함 8~15로 입력해주세요.';

interface MyPageProps {
  handleToTop?: () => void;
}

const MY_SIDE = 0;
const MY_IDEA = 1;
const MY_COMMENT = 2;

const INIT = 0;
const IS_EDIT = 1;
const IS_EDIT_NICKNAME = 2;
const IS_EDIT_PASSWORD = 3;

const MyPage = ({ handleToTop }: MyPageProps) => {
  const [currentTab, setCurrentTab] = useState(MY_SIDE);
  const [isEdit, setIsEdit] = useState(INIT);
  const { data: isAuth } = useAuth();

  const { data } = useGetUser(isAuth ?? false);

  const { data: alarmData } = useReadAlarm(isAuth ?? false);

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const nicknameRef = useRef({} as ParentRef);
  const passwordRef = useRef({} as ParentRef);
  const updatePasswordRef = useRef({} as ParentRef);

  const updateNicknameMutate = useUpdateNickname();
  const updatePasswordMutate = useUpdatePassword();

  const handleNicknameChange = () => {
    const nickname = nicknameRef.current.get();
    if (nickname.length === 0 || nicknameRef === undefined)
      return showAlert('닉네임을 입력해주세요!');

    updateNicknameMutate.mutate(
      { nickname },
      {
        onSuccess: () => {
          showAlert('닉네임이 변경되었습니다!');
          setIsEdit(INIT);
        },
        onError: () => {
          showAlert('기존 비밀번호를 정확하게 입력해주세요.');
        },
      },
    );
  };

  const handlePasswordChange = () => {
    const password = passwordRef.current.get();
    const updatePassword = updatePasswordRef.current.get();

    if (password.length === 0 || passwordRef === undefined)
      return showAlert('비밀번호를 입력해주세요!');
    if (updatePassword.length === 0 || updatePasswordRef === undefined)
      return showAlert('새로운 비밀번호를 입력해주세요!');
    if (!isValidPasswd(password) || !isValidPasswd(updatePassword)) {
      return showAlert(INVALID_PASSWD_TEXT);
    }

    updatePasswordMutate.mutate(
      { password, updatePassword },
      {
        onSuccess: () => {
          showAlert('비밀번호가 변경되었습니다!');
          setIsEdit(INIT);
        },
        onError: () => {
          showAlert(GuideText.ERROR);
        },
      },
    );
  };

  return (
    <div className={styles.MyPage}>
      <div className={styles.myPageContainer}>
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            마이페이지
          </Typography>
        </div>
        {isEdit === INIT ? (
          <>
            <div className={styles.infoContainer}>
              <UserInfoCard
                nickname={data?.nickname || ''}
                level={data?.level || 0}
                point={data?.point || 0}
              />
              <div className={styles.buttonArea}>
                <Button variant="text" onClick={() => setIsEdit(IS_EDIT)}>
                  회원정보수정
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    showAlert(
                      'seung-00@naver.com 로 메일을 주시면 48시간 내에 처리하겠습니다.',
                    )
                  }
                >
                  탈퇴하기
                </Button>
              </div>
            </div>
            <div className={styles.alertContainer}>
              <div className={styles.alertTitle}>
                <Typography fontSize="md" textColor="black">
                  알람
                </Typography>
              </div>
              <div className={styles.alarmCardArea}>
                {(alarmData || [])?.length > 0 ? (
                  alarmData?.map((props) => (
                    <AlarmCardContainer key={props.id} {...props} />
                  ))
                ) : (
                  <Typography
                    className={styles.myAlarmTypography}
                    fontSize="md"
                    textColor="lightGray"
                  >
                    새로운 알람이 없습니다.
                  </Typography>
                )}
              </div>
            </div>
            <div className={styles.myContentContainer}>
              <div className={styles.tabArea}>
                <Button variant="text" onClick={() => setCurrentTab(MY_SIDE)}>
                  <Typography
                    fontSize="md"
                    textColor={currentTab === MY_SIDE ? 'blueActive' : 'black'}
                  >
                    내가 쓴 사이드
                  </Typography>
                </Button>
                <Typography fontSize="md" textColor="black">
                  |
                </Typography>
                <Button variant="text" onClick={() => setCurrentTab(MY_IDEA)}>
                  <Typography
                    fontSize="md"
                    textColor={currentTab === MY_IDEA ? 'blueActive' : 'black'}
                  >
                    내가 쓴 아이디어
                  </Typography>
                </Button>
                <Typography fontSize="md" textColor="black">
                  |
                </Typography>
                <Button
                  variant="text"
                  onClick={() => setCurrentTab(MY_COMMENT)}
                >
                  <Typography
                    fontSize="md"
                    textColor={
                      currentTab === MY_COMMENT ? 'blueActive' : 'black'
                    }
                  >
                    내가 쓴 댓글
                  </Typography>
                </Button>
              </div>
              {
                {
                  [MY_SIDE]: <MySideList />,
                  [MY_IDEA]: <MyIdeaList />,
                  [MY_COMMENT]: <MyCommentList />,
                }[currentTab]
              }
            </div>
          </>
        ) : (
          <div className={styles.editInfoContainer}>
            <Typography fontSize="md" textColor="black">
              회원 정보 수정
            </Typography>
            {isEdit === IS_EDIT && (
              <>
                <div className={styles.editInfoButtonArea}>
                  <div
                    className={styles.editInfoButton}
                    onClick={() => setIsEdit(IS_EDIT_NICKNAME)}
                    aria-hidden
                  >
                    <Typography fontSize="md" textColor="black">
                      회원 정보 수정
                    </Typography>
                  </div>
                  <div
                    className={styles.editInfoButton}
                    onClick={() => setIsEdit(IS_EDIT_PASSWORD)}
                    aria-hidden
                  >
                    <Typography fontSize="md" textColor="black">
                      비밀번호 변경
                    </Typography>
                  </div>
                </div>
                <div className={styles.editInfoBottomButtonArea}>
                  <Button onClick={() => setIsEdit(INIT)}>이전</Button>
                </div>
              </>
            )}
            {isEdit === IS_EDIT_NICKNAME && (
              <div className={styles.editNickname}>
                <Typography fontSize="xxs" textColor="black">
                  닉네임
                </Typography>
                <div className={styles.editNicknameLastCol}>
                  <Input ref={nicknameRef} placeholder="nickname" />
                  <Button onClick={() => setIsEdit(IS_EDIT)}>취소</Button>
                  <Button onClick={handleNicknameChange} primary>
                    변경
                  </Button>
                </div>
              </div>
            )}
            {isEdit === IS_EDIT_PASSWORD && (
              <div className={styles.editPassword}>
                <div className={styles.editPasswordRow}>
                  <Typography fontSize="xxs" textColor="black">
                    현재 비밀번호
                  </Typography>
                  <Input ref={passwordRef} placeholder="" password />
                </div>
                <div className={styles.editPasswordRow}>
                  <Typography fontSize="xxs" textColor="black">
                    새로운 비밀번호
                  </Typography>
                  <div className={styles.editPasswordLastCol}>
                    <Input
                      ref={updatePasswordRef}
                      placeholder="숫자, 문자 포함 8~15자리"
                      password
                    />
                    <Button onClick={() => setIsEdit(IS_EDIT)}>취소</Button>
                    <Button onClick={handlePasswordChange} primary>
                      변경
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Button
        className={cn(styles.scrollTopButton)}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
      {isAlertVisible && (
        <AlertModal
          content={alertMessage}
          handleConfirm={() => {
            hideAlert();
          }}
        />
      )}
    </div>
  );
};

export default MyPage;
