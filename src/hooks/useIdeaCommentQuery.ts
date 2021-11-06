import { ReadCommentData } from '@src/models';
import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export type DataMappedIdea = {
  ideaId: number;
  content: string;
};

export type DataMappedComment = {
  commentId: number;
} & DataMappedIdea;

export type DataMappedNestedComment = {
  commentId: number;
  nestedCommentId: number;
} & DataMappedIdea;

export const useReadIdeaComments = (ideaId: number) =>
  useQuery<ReadCommentData, AxiosError<unknown>>(
    [`/ideas/${ideaId}/comments`, ideaId],
    async ({ queryKey }) => {
      const ideaId = queryKey[1];
      const { data } = await getApiInstance().get<ReadCommentData>(
        `/ideas/${ideaId}/comments`,
      );
      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );

export const useCreateIdeaComment = (ideaId: number) => {
  const queryClient = useQueryClient();
  const path = `/ideas/${ideaId}/comments`;

  return useMutation<unknown, AxiosError<unknown>, string>(
    async (content) => {
      await getApiInstance().post(path, { content });
    },
    {
      onSuccess: () => {
        alert('성공');
        queryClient.invalidateQueries(path);
      },
      onError: () => {
        alert('실패');
      },
    },
  );
};

export const useUpdateIdeaComment = () =>
  useMutation<unknown, AxiosError<unknown>, DataMappedComment>(
    async ({ ideaId, commentId, content }) => {
      await getApiInstance().put(`/ideas/${ideaId}/comments/${commentId}`, {
        content,
      });
    },
  );

export const useDeleteIdeaComment = () =>
  useMutation<unknown, AxiosError<unknown>, DataMappedComment>(
    async ({ ideaId, commentId }) => {
      await getApiInstance().delete(`/ideas/${ideaId}/comments/${commentId}`);
    },
  );

interface readNestedCommentsProps {
  ideaId: number;
  commentId: number;
}
export const useReadIdeaNestedComments = ({
  ideaId,
  commentId,
}: readNestedCommentsProps) =>
  useQuery<ReadCommentData, AxiosError<unknown>>(
    [
      `/ideas/${ideaId}/comments/${commentId}/child-comments`,
      ideaId,
      commentId,
    ],
    async ({ queryKey }) => {
      const ideaId = queryKey[1];
      const commentId = queryKey[2];
      const { data } = await getApiInstance().get<ReadCommentData>(
        `/ideas/${ideaId}/comments/${commentId}/child-comments`,
      );
      // TODO: reverse 안 쓰도록 수정
      return data?.reverse();
    },
    { refetchOnWindowFocus: false, retry: false },
  );

export const useCreateIdeaNestedComment = (
  ideaId: number,
  commentId: number,
) => {
  const queryClient = useQueryClient();
  const path = `/ideas/${ideaId}/comments/${commentId}/child-comments`;

  return useMutation<unknown, AxiosError<unknown>, string>(
    async (content) => {
      await getApiInstance().post(path, { content });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(path);
      },
    },
  );
};

export const useUpdateIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, DataMappedNestedComment>(
    async ({ ideaId, commentId, content, nestedCommentId }) => {
      await getApiInstance().put(
        `/ideas/${ideaId}/comments/${commentId}/child-comments/${nestedCommentId}`,
        { content },
      );
    },
  );

export const useDeleteIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, DataMappedNestedComment>(
    async ({ ideaId, commentId, nestedCommentId }) => {
      await getApiInstance().delete(
        `/ideas/${ideaId}/comments/${commentId}/child-comments/${nestedCommentId}`,
      );
    },
  );
