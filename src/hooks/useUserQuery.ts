import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useQuery, useMutation } from 'react-query';

interface UserVariable {
  username: string;
  password: string;
  nickname: string;
}

export const useGetUser = () => useQuery('me');

export const useUserExist = (username: string) =>
  useQuery<string, AxiosError<unknown>, unknown, string[]>(
    ['/users/exists', username],
    async (username) => {
      const { data } = await getApiInstance().get(`/users/exists`, {
        params: {
          username,
        },
      });
      return data;
    },
    {
      enabled: false,
    },
  );

export const useCreateUser = () =>
  useMutation<void, AxiosError<unknown>, UserVariable>((params) =>
    getApiInstance().post(`/users`, params),
  );
