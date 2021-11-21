import React from 'react';
import HeartIcon from '@src/assets/Heart.svg';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';
import styles from './LikeButton.module.scss';
import cn from 'classnames';
import { Favorites } from '@src/models';

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
  return (
    <Button
      variant="text"
      className={cn(
        styles.LikeButton,
        (favorites?.isFavorite ?? false) && styles.highlight,
      )}
      disabled={!isAuth}
      onClick={handleLike}
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
