import React from 'react';
import styles from './UserInfoCard.module.scss';
import Card from '@src/components/common/Card';
import Typography from '@src/components/common/Typography';

export interface UserInfoCardProps {
  nickname: string;
  level: number;
  point: number;
}

const UserInfoCard = ({ nickname, level, point }: UserInfoCardProps) => {
  return (
    <Card className={styles.UserInfoCard}>
      <div className={styles.leftArea}>
        <Typography fontSize={'xxl'} fontWeight={'bold'}>
          {`안녕하세요!`}
        </Typography>
        <div className={styles.nicknameContainer}>
          <Typography
            fontSize={'xxl'}
            fontWeight={'bold'}
            textColor={'blueActive'}
          >
            {nickname}
          </Typography>
          <Typography fontSize={'xxl'} fontWeight={'bold'}>
            님
          </Typography>
        </div>
      </div>
      <div className={styles.rightArea}>
        <div className={styles.userInfoContainer}>
          <Typography fontSize={'md'}>My Level</Typography>
          <Typography className={styles.valueText}>{level}</Typography>
        </div>
        <div className={styles.userInfoContainer}>
          <Typography fontSize={'md'}>My Points</Typography>
          <Typography className={styles.valueText}>{point}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
