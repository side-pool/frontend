import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSidesData, SideParams } from '@src/models';
import { getApiInstance } from '@src/utils/context';

export type CreateSideParams = {
  categoryNames: string[];
  detail: string;
  githubIdentifier: string;
  githubLink: string;
  logoUrl: string;
  organizationIds: string[];
  // period: number;
  pushedAt: string;
  recruiting: string;
  serviceLink: string;
  skillIds: string[];
  summary: string;
  title: string;
};
export const useReadSides = (params: SideParams) =>
  useQuery<ReadSidesData, AxiosError<unknown>>(['/sides', params]);

export const useCreateSide = () => {
  return useMutation<string, unknown, CreateSideParams>(async (params) => {
    return await getApiInstance().post('/sides', { ...params });
  });
};
