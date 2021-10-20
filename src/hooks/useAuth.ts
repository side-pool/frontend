import { api } from '@src/api/context';
import { useMutation, useQueryClient } from 'react-query';

import { saveItem, removeItem, ACCESS_TOKEN } from '@src/utils/storage';
import { AxiosError } from 'axios';

interface LoginRequestParams {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
    type: string;
  };
}

export const useLogin = () =>
  useMutation(
    (params: LoginRequestParams): Promise<LoginResponse> =>
      api.post(`/login`, params),
    {
      onSuccess: ({ data: { token } }: LoginResponse) => {
        saveItem(ACCESS_TOKEN, `${token}`);
      },
      onError: async (err: AxiosError<any>) => {
        console.log(err);
      },
    },
  );

export const useLogout = () => {
  const queryClient = useQueryClient();

  removeItem(ACCESS_TOKEN);
  queryClient.removeQueries('me');
};
