import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { HashTagInfo } from '@src/models';

export const useGetHashTags = () =>
  useQuery<HashTagInfo[], AxiosError<unknown>>(['/hashtags'], {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
