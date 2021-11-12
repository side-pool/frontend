import { useInfiniteQuery, useMutation } from 'react-query';
import { Idea, ReadIdeasData } from '@src/models';
import { IdeaParams } from '@src/store/ideaSlice';
import { getApiInstance } from '@src/utils/context';

type CreateUpdateIdeaParam = Pick<Idea, 'title' | 'content'> &
  Pick<Partial<Idea>, 'hashtags'>;

export const useReadIdeas = (params: IdeaParams) => {
  const PAGE_SIZE = 5;
  let page = 0;

  return useInfiniteQuery(
    ['/ideas', params] as const,
    async ({ queryKey: [url, params], pageParam = 0 }) => {
      const { data } = await getApiInstance().get<ReadIdeasData>(url, {
        params: {
          ...params,
          page: pageParam,
          size: PAGE_SIZE,
        },
      });
      // TODO: 마지막 페이지 체크
      return data;
    },
    {
      getNextPageParam: () => {
        page += 1;
        return page;
      },
    },
  );
};

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
