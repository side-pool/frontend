import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSidesData, SideParams } from '@src/models';
import { getApiInstance } from '@src/utils/context';

export type CreateSideParams = {
  categoryNames: string[];
  detail: string;
  githubIdentifier: number;
  githubLink: string;
  logoUrl: string;
  organizationIds: number[];
  pushedAt: string;
  recruiting: boolean;
  serviceLink: string;
  skillIds: number[];
  summary: string;
  title: string;
};

export const useReadSides = (params: SideParams) =>
  useQuery<ReadSidesData, AxiosError<unknown>>(['/sides', params]);

export const useCreateSide = () => {
  return useMutation<string, AxiosError<{ error: string }>, CreateSideParams>(
    async (params) => {
      return await getApiInstance().post('/sides', { ...params });
    },
  );
};
