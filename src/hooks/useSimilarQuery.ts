import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSimilarData } from '@src/models';
import { getApiInstance } from '@src/utils/context';

type SimilarContext = {
  ideaId: number;
  similarId: number;
  description: string;
  url: string;
};

export const getSimilarUrl = (ideaId: number) => `/ideas/${ideaId}/similars`;

export const useReadSimilars = (ideaId: number) =>
  useQuery(
    [getSimilarUrl(ideaId), ideaId] as const,
    async ({ queryKey }) => {
      const ideaId = queryKey[1];
      const { data } = await getApiInstance().get<ReadSimilarData>(
        getSimilarUrl(ideaId),
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

export const useCreateSimilar = (ideaId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<unknown>,
    Omit<SimilarContext, 'ideaId' | 'similarId'>
  >(
    async ({ description, url }) => {
      await getApiInstance().post(getSimilarUrl(ideaId), { description, url });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`/ideas`);
      },
    },
  );
};

export const useUpdateSimilar = () =>
  useMutation<unknown, AxiosError<unknown>, SimilarContext>(
    async ({ ideaId, similarId, description, url }) => {
      await getApiInstance().put(`${getSimilarUrl(ideaId)}/${similarId}`, {
        description,
        url,
      });
    },
  );

export const useDeleteSimilar = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<unknown>,
    Omit<SimilarContext, 'url' | 'description'>
  >(
    async ({ ideaId, similarId }) => {
      await getApiInstance().delete(`${getSimilarUrl(ideaId)}/${similarId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`/ideas`);
      },
    },
  );
};
