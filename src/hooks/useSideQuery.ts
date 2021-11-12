import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
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
  organizations: {
    id: string;
    name: string;
  }[];
  skills: {
    id: string;
    name: string;
  }[];
  githubLink: string;
  serviceLink: string;
  recruiting: false;
  favoriteCount: 0;
  comments: [];
  isFavorite: false;
};

export const useReadSides2 = (params: SideParams) => {
  return useQuery<ReadSidesData, AxiosError<unknown>>(['/sides', params]);
};

export const useReadSides = (params: SideParams) => {
  const PAGE_SIZE = 5;

  return useInfiniteQuery(
    ['/sides', params] as const,
    async ({ queryKey: [url, params], pageParam = 0 }) => {
      const { data: page } = await getApiInstance().get<ReadSidesData>(url, {
        params: {
          ...params,
          page: pageParam,
          size: PAGE_SIZE,
        },
      });

      return page;
    },
  );
};

export const useCreateSide = () => {
  return useMutation<string, AxiosError<{ error: string }>, CreateSideParams>(
    async (params) => {
      return await getApiInstance().post('/sides', { ...params });
    },
  );
};

export const useUpdateSide = (id: string) => {
  return useMutation<string, AxiosError<{ error: string }>, CreateSideParams>(
    async (params) => {
      return await getApiInstance().put(`/sides/${id}`, { ...params });
    },
  );
};

export const useReadSideDetail = (id: string) =>
  useQuery<ReadSideParams, AxiosError<unknown>>(`/sides/${id}/without-auth`);

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

export const useReadMySides = () =>
  useQuery<ReadSidesData, AxiosError<unknown>>(['/me/sides']);
