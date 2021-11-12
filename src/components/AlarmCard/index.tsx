import React from 'react';
import styles from './AlarmCard.module.scss';
import Card from '@src/components/common/Card';
import Typography from '@src/components/common/Typography';
import Close from '@src/assets/Close.svg';
import cn from 'classnames';

export interface AlarmCardProps {
  postType: string;
  title: string;
  content: string;
  onClose: () => void;
  onClick: () => void;
}

const AlarmCard = ({
  postType,
  title,
  content,
  onClose,
  onClick,
}: AlarmCardProps) => {
  return (
    <Card className={styles.AlarmCard} onClick={onClick}>
      <div className={styles.alarmCardTopArea}>
        <div className={styles.alarmCardTextArea}>
          <Typography
            className={styles.newCommentContainer}
            fontSize={'sm'}
            fontWeight={'bold'}
          >
            새댓글
          </Typography>
          <Typography
            className={styles.postTypeContainer}
            fontSize={'sm'}
            textColor={'blueActive'}
          >
            {postType === 'idea' ? '아이디어' : '사이드'}
          </Typography>
        </div>
        <Close className={cn(styles.closeIconContainer)} onClick={onClose} />
      </div>
      <div className={styles.alarmCardContentArea}>
        <Typography
          className={styles.ellipse}
          textColor={'gray'}
          fontSize={'sm'}
        >
          {title}
        </Typography>
        <Typography className={styles.ellipse} fontSize={'sm'}>
          {content}
        </Typography>
      </div>
    </Card>
  );
};

export default AlarmCard;
