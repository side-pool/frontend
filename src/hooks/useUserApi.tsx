import api from '@src/api/context';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { SERVER_URL } from '@src/api/context';
import { saveItem, removeItem, ACCESS_TOKEN } from '@src/utils/storage';

interface JoinParams {
  username: string;
  password: string;
  nickname: string;
}

export const usePostJoin = () => {
  return useMutation(
    async (params: JoinParams) => {
      return await api.post(`${SERVER_URL}/users`, { data: params });
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
      return await api.put(`${SERVER_URL}/users/${id}`, { data: params });
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
      return await api.delete(`${SERVER_URL}/users/${id}`);
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
      return await api.post(`${SERVER_URL}/login`, params);
    },
    {
      onSuccess: ({ token }: LoginRepsonseParamas) => {
        saveItem(ACCESS_TOKEN, token);
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

export default function useGetUserInfo() {
  return useQuery('me', async () => await api.get(`${SERVER_URL}$/me`));
}
