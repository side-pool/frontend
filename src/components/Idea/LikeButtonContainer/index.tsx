import React from 'react';
import { useAuth } from '@src/hooks/useUserQuery';
import {
  useCreateFavorites,
  useDeleteFavorites,
  useReadFavorites,
} from '@src/hooks/useFavoritesQuery';
import LikeButton from '@src/components/common/LikeButton';

export interface LikeButtonContainerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  ideaId: number;
}

const LikeButtonContainer = ({ ideaId }: LikeButtonContainerProps) => {
  const { data: isAuth } = useAuth();
  const { data: favorites, isSuccess: isFavoritesSuccess } = useReadFavorites(
    ideaId,
    isAuth ?? false,
  );
  const createMutation = useCreateFavorites(ideaId);
  const deleteMutation = useDeleteFavorites(ideaId);

  const handleLike = () => {
    isFavoritesSuccess &&
      (favorites?.isFavorite
        ? deleteMutation.mutate()
        : createMutation.mutate());
  };

  return (
    <>
      {isFavoritesSuccess && (
        <LikeButton
          isAuth={isAuth ?? false}
          handleLike={handleLike}
          favorites={favorites ?? { isFavorite: false, favoriteCount: 0 }}
        />
      )}
    </>
  );
};

export default LikeButtonContainer;
