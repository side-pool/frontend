import { Idea, ReadIdeasData } from '@src/models';
import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

type CreateUpdateIdeaParam = Pick<Idea, 'title' | 'content'> &
  Pick<Partial<Idea>, 'hashtags'>;

export const useReadIdeas = () =>
  useQuery<ReadIdeasData, AxiosError<unknown>>('/ideas/without-auth');

export const useCreateIdea = () => {
  return useMutation<string, unknown, CreateUpdateIdeaParam>(async (params) => {
    return await getApiInstance().post('/ideas', { data: params });
  });
};

export const useUpdateIdea = () => {
  return useMutation<unknown, unknown, CreateUpdateIdeaParam>(
    async (params) => {
      return await getApiInstance().put('/ideas', { data: params });
    },
  );
};

export const useDeleteIdea = () => {
  return useMutation<unknown, unknown, string>(async (id) => {
    return await getApiInstance().delete(`/ideas/${id}`);
  });
};
