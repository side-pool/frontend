import { ReadCommentData } from '@src/models';
import { getApiInstance } from '@src/utils/context';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

export type CreateIdeaCommentVariable = {
  ideaId: number;
  content: string;
};

export type CreateIdeaReplyCommentVariable = {
  commentId: number;
} & CreateIdeaCommentVariable;

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
  );

export const useCreateIdeaComment = () =>
  useMutation<unknown, AxiosError<unknown>, CreateIdeaCommentVariable>(
    async ({ ideaId, content }) => {
      await getApiInstance().post(`/ideas/${ideaId}/comments`, { content });
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
      return data?.reverse();
    },
  );

export const useCreateIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, CreateIdeaReplyCommentVariable>(
    async ({ ideaId, commentId, content }) => {
      await getApiInstance().post(
        `/ideas/${ideaId}/comments/${commentId}/child-comments`,
        { content },
      );
    },
  );

export const useUpdateIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, CreateIdeaReplyCommentVariable>(
    async ({ ideaId, commentId, content }) => {
      await getApiInstance().put(
        `/ideas/${ideaId}/comments/${commentId}/child-comments`,
        { content },
      );
    },
  );

export const useDeleteIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, CreateIdeaReplyCommentVariable>(
    async ({ ideaId, commentId }) => {
      await getApiInstance().delete(
        `/ideas/${ideaId}/comments/${commentId}/child-comments`,
      );
    },
  );
