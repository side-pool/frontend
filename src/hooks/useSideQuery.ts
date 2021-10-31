import { ReadSidesData } from '@src/models';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useReadSides = () =>
  useQuery<ReadSidesData, AxiosError<unknown>>('/toys');
