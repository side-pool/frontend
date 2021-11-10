import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import LikeButton from '@src/components/common/LikeButton';

export default {
  title: 'Common/LikeButton',
  component: LikeButton,
} as Meta;

export const likeButton = () => {
  const [favorites, setFavorites] = useState({
    isFavorite: false,
    favoriteCount: 0,
  });

  const handleLike = () => {
    setFavorites({
      isFavorite: !favorites.isFavorite,
      favoriteCount: favorites.isFavorite
        ? favorites.favoriteCount - 1
        : favorites.favoriteCount + 1,
    });
  };

  return (
    <LikeButton isAuth={true} favorites={favorites} handleLike={handleLike} />
  );
};
