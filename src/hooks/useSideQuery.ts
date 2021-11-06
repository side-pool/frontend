import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSidesData, SidePrams } from '@src/models';

export const useReadSides = (params: SidePrams) =>
  useQuery<ReadSidesData, AxiosError<unknown>>(['/sides', params]);
