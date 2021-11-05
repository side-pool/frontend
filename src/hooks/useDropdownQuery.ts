import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

type DropdownData = {
  data?: {
    data?:
      | {
          id: number;
          name: string;
        }[]
      | string[]
      | never[];
  };
};

export const useGetCategory = () =>
  useQuery<DropdownData, AxiosError<unknown>>('/categories');

export const useGetOrganization = () =>
  useQuery<DropdownData, AxiosError<unknown>>('/organizations');

export const useGetPeriods = () =>
  useQuery<DropdownData, AxiosError<unknown>>('/periods');

export const useGetSkills = () =>
  useQuery<DropdownData, AxiosError<unknown>>('/skills');
