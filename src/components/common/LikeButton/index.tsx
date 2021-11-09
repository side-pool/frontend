import React from 'react';
import HeartIcon from '@src/assets/Heart.svg';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';
import styles from './LikeButton.module.scss';
import cn from 'classnames';
import { useAuth } from '@src/hooks/useUserQuery';
import {
  useCreateFavorites,
  useDeleteFavorites,
  useReadFavorites,
} from '@src/hooks/useFavoritesQuery';

export interface LikeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  ideaId: number;
}

const LikeButton = ({ ideaId, ...props }: LikeButtonProps) => {
  const { data: isAuth } = useAuth();
  const { data: favorites, isSuccess: isFavoritesSuccess } = useReadFavorites(
    ideaId,
    isAuth ?? false,
  );
  const createMutation = useCreateFavorites(ideaId);
  const deleteMutation = useDeleteFavorites(ideaId);

  return (
    <Button
      variant="text"
      className={cn(
        styles.LikeButton,
        (favorites?.isFavorite ?? false) && styles.highlight,
      )}
      disabled={!isAuth}
      onClick={() => {
        isFavoritesSuccess &&
          (favorites?.isFavorite
            ? deleteMutation.mutate()
            : createMutation.mutate());
      }}
      {...props}
    >
      <div className={styles.likeButtonContent}>
        <HeartIcon className={styles.heartIcon} />
        <Typography fontSize="sm">좋아요</Typography>
        <Typography fontSize="sm" textColor="gray">
          {favorites?.favoriteCount ?? 0}
        </Typography>
      </div>
    </Button>
  );
};

export default LikeButton;
