import { api, apiWithToken } from '@src/api/context';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { saveItem, removeItem, ACCESS_TOKEN } from '@src/utils/storage';

interface JoinParams {
  username: string;
  password: string;
  nickname: string;
}

export const usePostJoin = () => {
  return useMutation(
    async (params: JoinParams) => {
      return await apiWithToken.post(`/users`, { data: params });
    },
    {
      onSuccess: () => {
        // response 없음
      },
      onError: (e) => {
        // TODO: status code에 따라 분기 처리?
        console.error(e);
      },
    },
  );
};

interface EditParams {
  password: string;
  nickname: string;
}

export const usePutUserInfo = (id: number) => {
  return useMutation(
    async (params: EditParams) => {
      return await apiWithToken.put(`/users/${id}`, {
        data: params,
      });
    },
    {
      onSuccess: () => {
        // response 없음
      },
      onError: (e) => {
        // TODO: status code에 따라 분기 처리?
        console.error(e);
      },
    },
  );
};

export const useDeleteUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      return await apiWithToken.delete(`/users/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.removeQueries('me');
      },
      onError: (e) => {
        // TODO: status code에 따라 분기 처리?
        console.error(e);
      },
    },
  );
};

interface LoginRequestParams {
  username: string;
  password: string;
}

interface LoginRepsonseParamas {
  token: string;
  type: string;
}

export const useLoginUser = () => {
  return useMutation(
    async (params: LoginRequestParams): Promise<LoginRepsonseParamas> => {
      alert('good');
      return await api.post(`/login`, params);
    },
    {
      onSuccess: async ({ type, token }: LoginRepsonseParamas) => {
        alert(type);
        alert(token);
        await saveItem(ACCESS_TOKEN, `${type} ${token}`);
        console.log('in');
        useGetUserInfo();
      },
      onError: (e) => {
        // TODO: status code에 따라 분기 처리?
        console.error(e);
      },
    },
  );
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  removeItem(ACCESS_TOKEN);
  queryClient.removeQueries('me');
};

export function useGetUserInfo() {
  return useQuery('me', async () => await apiWithToken.get(`/me`));
}
