import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { Idea, ReadIdeasData } from '@src/models';
import { IdeaParams } from '@src/store/ideaSlice';
import { getApiInstance } from '@src/utils/context';

type CreateUpdateIdeaParam = Pick<Idea, 'title' | 'content'> &
  Pick<Partial<Idea>, 'hashtags'>;

export const useReadIdeas = (params: IdeaParams) => {
  const PAGE_SIZE = 5;

  return useInfiniteQuery(
    ['/ideas', params] as const,
    async ({ queryKey: [url, params], pageParam = 0 }) => {
      const { data: page } = await getApiInstance().get<ReadIdeasData>(url, {
        params: {
          ...params,
          page: pageParam,
          size: PAGE_SIZE,
        },
      });

      return page;
    },
  );
};

export const useReadIdea = (id: number) =>
  useQuery<Idea, unknown>([`/ideas/${id}`]);

export const useCreateIdea = () => {
  return useMutation<string, unknown, CreateUpdateIdeaParam>(async (params) => {
    return await getApiInstance().post('/ideas', { ...params });
  });
};

export const useUpdateIdea = () => {
  return useMutation<unknown, unknown, CreateUpdateIdeaParam>(
    async (params) => {
      return await getApiInstance().put('/ideas', { ...params });
    },
  );
};

export const useDeleteIdea = () => {
  return useMutation<unknown, unknown, string>(async (id) => {
    return await getApiInstance().delete(`/ideas/${id}`);
  });
};
