import Card from '@src/components/common/Card';
import Typography from '@src/components/common/Typography';
import { MyComment } from '@src/models';
import { getDiffTime } from '@src/utils/common';
import React from 'react';
import styles from './MyCommentCard.module.scss';

const MyCommentCard = ({ title, type, updatedDate, content }: MyComment) => {
  return (
    <Card className={styles.MyCommentCard}>
      <div className={styles.myCommentTopArea}>
        <Typography className={styles.myCommentTitle} fontSize="xs">
          {title}
        </Typography>
        <Typography fontSize="xs" textColor="blueActive">
          {type}
        </Typography>
      </div>
      <div className={styles.myCommentBottomArea}>
        <Typography className={styles.myCommentTime} fontSize="xxs">
          {getDiffTime({
            newDate: new Date(),
            oldDate: new Date(updatedDate),
          })}
        </Typography>
        <Typography fontSize="xs" textColor="black">
          {content}
        </Typography>
      </div>
    </Card>
  );
};

export default MyCommentCard;
