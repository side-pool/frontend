import { useQueries, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { getGithubApiInstance } from '@src/utils/githubContext';

export type GithubInfoType = {
  id: number;
  homepage: string;
  html_url: string;
  owner: {
    avatar_url: string;
  };
  pushed_at: string;
  name: string;
  description: string;
  default_branch: string;
  full_name: string;
  contributors_url: string;
};

export type ContributorsType = {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
};

export const useIsExistRepository = (id: number) =>
  useQuery<{ duplicated: boolean }>(`/sides/exists/${id}`, { enabled: !!id });

export const useReadGithubInfo = (url: string) =>
  useQuery<GithubInfoType>(
    `https://api.github.com/repos/${url}`,
    async () => {
      const { data } = await getGithubApiInstance().get(
        `https://api.github.com/repos/${url}`,
      );

      return data;
    },
    {
      enabled: url.length > 0,
      retry: 0,
    },
  );

export const useReadContributors = (contributors_url: string) =>
  useQuery<ContributorsType>(contributors_url, async () => {
    const { data } = await getGithubApiInstance().get(contributors_url);
    return data;
  });

export const useReadReadme = (full_name: string, default_branch: string) =>
  useQueries([
    {
      queryKey: `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
      queryFn: async () => {
        const { data } = await axios.get(
          `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
        );

        return data;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
    {
      queryKey: `https://raw.githubusercontent.com/${full_name}/${default_branch}/readme.md`,
      queryFn: async () => {
        const { data } = await axios.get(
          `https://raw.githubusercontent.com/${full_name}/${default_branch}/readme.md`,
        );

        return data;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
    {
      queryKey: `https://raw.githubusercontent.com/${full_name}/${default_branch}/docs/README.md`,
      queryFn: async () => {
        const { data } = await axios.get(
          `https://raw.githubusercontent.com/${full_name}/${default_branch}/docs/README.md`,
        );

        return data;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
    {
      queryKey: `https://raw.githubusercontent.com/${full_name}/${default_branch}/docs/readme.md`,
      queryFn: async () => {
        const { data } = await axios.get(
          `https://raw.githubusercontent.com/${full_name}/${default_branch}/docs/readme.md`,
        );

        return data;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  ]).filter((each) => each.status === 'success')[0];
