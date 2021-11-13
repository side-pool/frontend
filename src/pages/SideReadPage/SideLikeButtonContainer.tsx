import React from 'react';
import { useAuth } from '@src/hooks/useUserQuery';
import {
  useCreateSideFavorites,
  useDeleteSideFavorites,
  useReadSideFavorites,
} from '@src/hooks/useSideFavoritesQuery';
import LikeButton from '@src/components/common/LikeButton';

export interface LikeButtonContainerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  sideId: number;
}

const SideLikeButtonContainer = ({ sideId }: LikeButtonContainerProps) => {
  const { data: isAuth } = useAuth();
  const { data: favorites, isSuccess: isFavoritesSuccess } =
    useReadSideFavorites(sideId, isAuth ?? false);
  const createMutation = useCreateSideFavorites(sideId);
  const deleteMutation = useDeleteSideFavorites(sideId);

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

export default SideLikeButtonContainer;
