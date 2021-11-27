import React from 'react';
import HeartIcon from '@src/assets/Heart.svg';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';
import styles from './LikeButton.module.scss';
import cn from 'classnames';
import { Favorites } from '@src/models';
import { showGlobalAlert, useAppDispatch } from '@src/store';

export interface LikeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  isAuth: boolean;
  favorites: Favorites;
  handleLike: () => void;
}

const LikeButton = ({
  isAuth,
  handleLike,
  favorites,
  ...props
}: LikeButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="text"
      className={cn(
        styles.LikeButton,
        (favorites?.isFavorite ?? false) && styles.highlight,
      )}
      onClick={() =>
        isAuth
          ? handleLike()
          : dispatch(
              showGlobalAlert({
                globalAlertMessage: '좋아요는 로그인 후 가능합니다.',
              }),
            )
      }
      {...props}
    >
      <div className={styles.likeButtonContent}>
        <HeartIcon className={styles.heartIcon} />
        <Typography className={styles.typoLike} fontSize="sm">
          좋아요
        </Typography>
        <Typography fontSize="sm" textColor="gray">
          {favorites?.favoriteCount ?? 0}
        </Typography>
      </div>
    </Button>
  );
};

export default LikeButton;
