import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
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
    {
      getNextPageParam: (lastPage, allPage) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return allPage.length;
      },
    },
  );
};

export const useReadIdea = (id: number) =>
  useQuery<Idea, unknown>([`/ideas/${id}`]);

export const useCreateIdea = () => {
  const queryClient = useQueryClient();

  return useMutation<string, unknown, CreateUpdateIdeaParam>(
    async (params) => {
      return await getApiInstance().post('/ideas', { ...params });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/ideas');
      },
    },
  );
};

export const useUpdateIdea = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, CreateUpdateIdeaParam>(
    async (params) => {
      return await getApiInstance().put(`/ideas/${id}`, { ...params });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/ideas');
      },
    },
  );
};

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string>(
    async (id) => {
      return await getApiInstance().delete(`/ideas/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/ideas');
      },
    },
  );
};
