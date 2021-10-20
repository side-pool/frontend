import { getApiInstance } from '@src/utils/context';
import { useMutation } from 'react-query';

interface IdeaData {
  title: string;
  content: string;
  hashtags?: string[];
}

export const useCreateIdea = () => {
  return useMutation<string, unknown, IdeaData>(async (params) => {
    return await getApiInstance().post('/ideas', { data: params });
  });
};

export const useUpdateIdea = () => {
  return useMutation<unknown, unknown, IdeaData>(async (params) => {
    return await getApiInstance().put('/ideas', { data: params });
  });
};

export const useDeleteIdea = () => {
  return useMutation<unknown, unknown, string>(async (id) => {
    return await getApiInstance().delete(`/ideas/${id}`);
  });
};
