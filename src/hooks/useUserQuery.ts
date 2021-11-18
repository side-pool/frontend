import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { HttpStatusCode } from '@src/constant/enums';
import { MyData, UserData } from '@src/models';
import { getApiInstance } from '@src/utils/context';
import { ACCESS_TOKEN, loadItem, removeItem } from '@src/utils/storage';

interface UserExistData {
  duplicated: boolean;
}

export const useGetUser = (isAuth: boolean) =>
  useQuery<MyData, AxiosError<unknown>>(['/me', isAuth], {
    enabled: isAuth,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

// TODO: staleTime 조절해서 서버 부담 줄이기
export const useAuth = () => {
  return useQuery<boolean, AxiosError<unknown>>(
    '/auth',
    async () => {
      const token = loadItem(ACCESS_TOKEN) ?? null;

      if (token) {
        await getApiInstance().get<MyData>('/me');
        return true;
      } else {
        return false;
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      onError: (error) => {
        if (error.response?.status === HttpStatusCode.UNAUTHORIZED) {
          // 토큰 만료
          removeItem(ACCESS_TOKEN);
        }
      },
    },
  );
};

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

export const useUpdateNickname = () => {
  const { data: isAuth } = useAuth();
  const { data } = useGetUser(isAuth ?? false);
  return useMutation<void, AxiosError<unknown>, Pick<UserData, 'nickname'>>(
    (params) => getApiInstance().put(`/users/nickname/${data?.id}`, params),
  );
};

export const useUpdatePassword = () => {
  const { data: isAuth } = useAuth();
  const { data } = useGetUser(isAuth ?? false);
  return useMutation<
    void,
    AxiosError<unknown>,
    Pick<UserData, 'password'> & { updatePassword: string }
  >((params) => getApiInstance().put(`/users/password/${data?.id}`, params));
};
