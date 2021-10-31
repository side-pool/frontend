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
        <div>
          <Typography
            className={styles.greetingText}
          >{`안녕하세요!`}</Typography>
        </div>
        <div className={styles.nicknameContainer}>
          <Typography className={styles.nicknameText}>{nickname}</Typography>
          <Typography className={styles.greetingText}>님</Typography>
        </div>
      </div>
      <div className={styles.rightArea}>
        <div className={styles.userInfoContainer}>
          <Typography className={styles.topText}>My Level</Typography>
          <Typography className={styles.bottomText}>{level}</Typography>
        </div>
        <div className={styles.userInfoContainer}>
          <Typography className={styles.topText}>My Points</Typography>
          <Typography className={styles.bottomText}>{point}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
