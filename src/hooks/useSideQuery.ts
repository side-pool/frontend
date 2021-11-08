import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSidesData, SideParams } from '@src/models';
import { getApiInstance } from '@src/utils/context';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';

export type CreateSideParams = {
  categoryNames: string[];
  detail: string;
  githubIdentifier: number;
  githubLink: string;
  logoUrl: string;
  organizationIds: number[];
  pushedAt: string;
  recruiting: boolean;
  serviceLink: string;
  skillIds: number[];
  summary: string;
  title: string;
};

export type ReadSideParams = {
  author: {
    id: number;
    level: number;
    nickname: string;
  };
  createdDate: string;
  updatedDate: string;
  id: number;
  title: string;
  summary: string;
  detail: string;
  categories: string[];
  logoUrl: string;
  active: number[]; // ?
  organizations: string[];
  skills: string[];
  githubLink: string;
  serviceLink: string;
  recruiting: false;
  favoriteCount: 0;
  comments: [];
  isFavorite: false;
};

export const useReadSides = (params: SideParams) =>
  useQuery<ReadSidesData, AxiosError<unknown>>(['/sides', params]);

export const useCreateSide = () => {
  return useMutation<string, AxiosError<{ error: string }>, CreateSideParams>(
    async (params) => {
      return await getApiInstance().post('/sides', { ...params });
    },
  );
};

export const useReadSideDetail = (id: string) => {
  // TODO: 추후 리펙토링
  const { data: isAuth } = useAuth();

  return useQuery<ReadSideParams, AxiosError<unknown>>(
    `/sides/${id}${isAuth ? '' : '/without-auth'}`,
    {
      enabled: isAuth,
    },
  );
};

export const useDeleteSide = () => {
  return useMutation<string, AxiosError<{ error: string }>, string>(
    async (id) => {
      return await getApiInstance().delete(`/sides/${id}`);
    },
  );
};

export const useIsMySide = (id: string) => {
  const { data: isAuth } = useAuth();
  const { data } = useGetUser(isAuth ?? false);

  return data?.id.toString() === id;
};
