import { Idea, ReadIdeasData } from '@src/models';
import { IdeaParams } from '@src/store/ideaSlice';
import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

type CreateUpdateIdeaParam = Pick<Idea, 'title' | 'content'> &
  Pick<Partial<Idea>, 'hashtags'>;

export const useReadIdeas = (params: IdeaParams) =>
  useQuery<ReadIdeasData, AxiosError<unknown>>(['/ideas', params]);

export const useReadIdea = (id: number) =>
  useQuery<Idea, AxiosError<unknown>>([`/ideas/${id}`]);

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
