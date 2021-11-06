import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSidesData, SideParams } from '@src/models';

export const useReadSides = (params: SideParams) =>
  useQuery<ReadSidesData, AxiosError<unknown>>(['/sides', params]);
