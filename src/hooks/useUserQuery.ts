import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useQuery, useMutation } from 'react-query';

interface UserVariable {
  username: string;
  password: string;
  nickname: string;
}

interface UserExistData {
  duplicated: boolean;
}

export const useGetUser = () => useQuery('me');

export const useUserExist = (
  username: string,
  callback: (data: boolean) => void,
) =>
  useQuery<boolean, AxiosError<unknown>>(
    ['/users/exists', username],
    async ({ queryKey }) => {
      const username = queryKey[1];
      const { data } = await getApiInstance().get<UserExistData>(
        `/users/exists/${username}`,
      );

      if (data.duplicated === undefined) {
        throw Error;
      }

      return data.duplicated;
    },
    {
      enabled: username !== '',
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onSuccess: (data) => {
        callback(data);
      },
    },
  );

export const useCreateUser = () =>
  useMutation<void, AxiosError<unknown>, UserVariable>((params) =>
    getApiInstance().post(`/users`, params),
  );
