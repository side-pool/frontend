import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { getApiInstance } from '@src/utils/context';
import { Favorites } from '@src/models';
import { getErrorText } from '@src/utils/common';

const getFavoritesUrl = (sideId: number) => `/sides/${sideId}/favorites`;

export const useReadSideFavorites = (sideId: number, isAuth: boolean) =>
  useQuery<Favorites, AxiosError<unknown>>(
    isAuth
      ? getFavoritesUrl(sideId)
      : `${getFavoritesUrl(sideId)}/without-auth`,
    {
      onError: (error) => {
        console.error(getErrorText(error));
      },
    },
  );

export const useCreateSideFavorites = (sideId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await getApiInstance().post(getFavoritesUrl(sideId));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFavoritesUrl(sideId));
      },
    },
  );
};

export const useDeleteSideFavorites = (sideId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      await getApiInstance().delete(getFavoritesUrl(sideId));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(getFavoritesUrl(sideId));
      },
    },
  );
};
