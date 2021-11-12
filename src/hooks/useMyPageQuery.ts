import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { AlarmData, MiniIdeaData, MyComment } from '@src/models';
import { getApiInstance } from '@src/utils/context';

export const useReadAlarm = () =>
  useQuery<AlarmData, AxiosError<unknown>>(['/notifications']);

export const useReadMyIdea = () =>
  useQuery<MiniIdeaData, AxiosError<unknown>>(['/me/ideas']);

export const useReadMyComment = () =>
  useQuery<MyComment[], AxiosError<unknown>>(['/me/comments']);

export const useDeleteAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<unknown>, number>(
    (id) => getApiInstance().delete(`/notifications/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`/notifications`);
      },
    },
  );
};

export const useTurnToReadAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<unknown>, number>(
    (id) => getApiInstance().put(`/notifications/read/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`/notifications`);
      },
    },
  );
};
