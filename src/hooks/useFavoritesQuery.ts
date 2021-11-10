import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { getApiInstance } from '@src/utils/context';
import { Favorites } from '@src/models';
import { getErrorText } from '@src/utils/common';

const getFavoritesUrl = (ideaId: number) => `/ideas/${ideaId}/favorites`;

export const useReadFavorites = (ideaId: number, isAuth: boolean) =>
  useQuery<Favorites, AxiosError<unknown>>(
    isAuth
      ? getFavoritesUrl(ideaId)
      : `${getFavoritesUrl(ideaId)}/without-auth`,
    {
      onError: (error) => {
        console.log(getErrorText(error));
      },
    },
  );

export const useCreateFavorites = (ideaId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await getApiInstance().post(getFavoritesUrl(ideaId));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFavoritesUrl(ideaId));
      },
    },
  );
};

export const useDeleteFavorites = (ideaId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await getApiInstance().delete(getFavoritesUrl(ideaId));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFavoritesUrl(ideaId));
      },
    },
  );
};
