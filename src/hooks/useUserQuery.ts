import { MyData, UserData } from '@src/models';
import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useQuery, useMutation } from 'react-query';

interface UserExistData {
  duplicated: boolean;
}

export const useGetUser = () => useQuery<MyData, AxiosError<unknown>>('me');

// TODO: staleTime 조절해서 서버 부담 줄이기
export const useCheckAuth = () =>
  useQuery<MyData, AxiosError<unknown>>('me', {
    refetchOnWindowFocus: false,
    retry: false,
  });

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
  useMutation<void, AxiosError<unknown>, UserData>((params) =>
    getApiInstance().post(`/users`, params),
  );
