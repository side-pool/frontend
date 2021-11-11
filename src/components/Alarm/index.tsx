import React from 'react';
import styles from './Alarm.module.scss';
import Card from '@src/components/common/Card';
import Typography from '@src/components/common/Typography';
import Close from '@src/assets/Close.svg';
import cn from 'classnames';

export interface AlarmProps {
  postType: string;
  title: string;
  content: string;
  onClose: () => void;
  onClick: () => void;
}

const Alarm = ({ postType, title, content, onClose, onClick }: AlarmProps) => {
  return (
    <Card className={styles.Alarm} onClick={onClick}>
      <div className={styles.topArea}>
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
        <Close className={cn(styles.closeIconContainer)} onClick={onClose} />
      </div>
      <Typography className={styles.ellipse} textColor={'gray'} fontSize={'sm'}>
        {title}
      </Typography>
      <Typography className={styles.ellipse} fontSize={'sm'}>
        {content}
      </Typography>
    </Card>
  );
};

export default Alarm;
