import { useMutation, useQueryClient } from 'react-query';
import { removeItem, ACCESS_TOKEN } from '@src/utils/storage';
import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';

interface LoginVariable {
  username: string;
  password: string;
}

interface LoginData {
  token: string;
  type: string;
}

// TODO: Response Type 좁히기
export const useLogin = () =>
  useMutation<LoginData | any, AxiosError<unknown>, LoginVariable>(
    async (params) => {
      const { data } = await getApiInstance().post(`/login`, params);
      return data;
    },
  );

export const useLogout = (redirectCallback: () => void) => {
  const queryClient = useQueryClient();

  const logout = () => {
    removeItem(ACCESS_TOKEN);

    queryClient.removeQueries('/auth');
    queryClient.removeQueries('/me');
    redirectCallback();
  };

  return [logout];
};
