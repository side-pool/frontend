import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { AlarmData } from '@src/models';
import { getApiInstance } from '@src/utils/context';

export const useReadAlarm = () =>
  useQuery<AlarmData, AxiosError<unknown>>(['/notifications']);

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

export const useTurnToReadAlarm = () =>
  useMutation<void, AxiosError<unknown>, number>((id) =>
    getApiInstance().put(`/notifications/${id}`),
  );
