import React from 'react';
import HeartIcon from '@src/assets/Heart.svg';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';
import styles from './LikeButton.module.scss';
import cn from 'classnames';

export interface LikeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count: number;
}

const LikeButton = ({ active = false, count, ...props }: LikeButtonProps) => {
  return (
    <Button
      variant={'text'}
      className={cn(styles.LikeButton, active && styles.active)}
      {...props}
    >
      <div className={styles.likeButtonContent}>
        <HeartIcon className={styles.heartIcon} />
        <Typography fontSize="sm">좋아요</Typography>
        <Typography fontSize="sm" textColor="gray">
          {count}
        </Typography>
      </div>
    </Button>
  );
};

export default LikeButton;
