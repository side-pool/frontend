import Button from '@src/components/common/Button';

import cn from 'classnames';
import UserInfoCard from '@src/components/UserInfoCard';
import Typography from '@src/components/common/Typography';
import React, { useState } from 'react';
import styles from './MyPage.module.scss';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import SideList from '@src/components/SideList';
import {
  useDeleteAlarm,
  useReadAlarm,
  useTurnToReadAlarm,
} from '@src/hooks/useMyPageQuery';
import AlarmCard from '@src/components/AlarmCard';

interface MyPageProps {
  handleToTop?: () => void;
}

const MY_SIDE = 0;
const MY_IDEA = 1;
const MY_COMMENT = 2;

const MyPage = ({ handleToTop }: MyPageProps) => {
  const [currentTab, setCurrentTab] = useState(MY_SIDE);
  const { data: isAuth } = useAuth();

  const { data } = useGetUser(isAuth ?? false);

  const { data: alarmData } = useReadAlarm();

  const deleteAlarmMutation = useDeleteAlarm();
  const turnToReadAlarmMutation = useTurnToReadAlarm();

  return (
    <div className={styles.MyPage}>
      <div className={styles.myPageContainer}>
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            사이드
          </Typography>
        </div>
        <div className={styles.infoContainer}>
          <UserInfoCard
            nickname={data?.nickname || ''}
            level={data?.level || 0}
            point={data?.point || 0}
          />
          <div className={styles.buttonArea}>
            <Button variant="text">회원정보수정</Button>
            <Button variant="text">탈퇴하기</Button>
          </div>
        </div>
        {(alarmData || [])?.length > 0 && (
          <div className={styles.alertContainer}>
            <div className={styles.alertTitle}>
              <Typography fontSize="md" textColor="black">
                알람
              </Typography>
            </div>
            <div className={styles.alarmCardArea}>
              {alarmData?.map(({ id, postType, title, content }) => (
                <AlarmCard
                  key={id}
                  postType={postType}
                  title={title}
                  content={content}
                  onClick={() => turnToReadAlarmMutation.mutate(id)}
                  onClose={() => deleteAlarmMutation.mutate(id)}
                />
              ))}
            </div>
          </div>
        )}
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
                네가 쓴 아이디어
              </Typography>
            </Button>
            <Typography fontSize="md" textColor="black">
              |
            </Typography>
            <Button variant="text" onClick={() => setCurrentTab(MY_COMMENT)}>
              <Typography
                fontSize="md"
                textColor={currentTab === MY_COMMENT ? 'blueActive' : 'black'}
              >
                내가 쓴 댓글
              </Typography>
            </Button>
          </div>
          <SideList isMyPage />
        </div>
      </div>
      <Button
        className={cn(styles.scrollTopButton)}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
    </div>
  );
};

export default MyPage;
