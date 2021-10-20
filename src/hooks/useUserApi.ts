import { api, apiWithToken } from '@src/api/context';
import { useQuery, useMutation } from 'react-query';

interface UserInfo {
  username: string;
  password: string;
  nickname: string;
}

export const useGetUser = () => useQuery('me', () => apiWithToken.get(`/me`));

export const useCreateUser = () =>
  useMutation((params: UserInfo) => api.post(`/users`, params), {
    onSuccess: () => {
      // response 없음
      alert('good');
    },
    onError: (e) => {
      // TODO: status code에 따라 분기 처리?
      console.error(e);
    },
  });
