import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadCommentsData } from '@src/models';
import { getApiInstance } from '@src/utils/context';

export type CommentContext = {
  ideaId: number;
  commentId: number;
  content?: string;
};

export const getCommentUrl = (ideaId: number) => `/ideas/${ideaId}/comments`;
export const getNestedCommentUrl = (ideaId: number, commentId: number) =>
  `${getCommentUrl(ideaId)}/${commentId}/child-comments`;

export type NestedCommentContext = {
  nestedCommentId: number;
} & CommentContext;

export const useReadIdeaComments = (ideaId: number) =>
  useQuery(
    [`${getCommentUrl(ideaId)}`, ideaId] as const,
    async ({ queryKey }) => {
      const ideaId = queryKey[1];
      const { data } = await getApiInstance().get<ReadCommentsData>(
        `${getCommentUrl(ideaId)}`,
      );
      return data;
    },
    { refetchOnWindowFocus: false, retry: false },
  );

export const useCreateIdeaComment = (ideaId: number) => {
  return useMutation<unknown, AxiosError<unknown>, string>(async (content) => {
    await getApiInstance().post(getCommentUrl(ideaId), { content });
  });
};

export const useUpdateIdeaComment = () =>
  useMutation<unknown, AxiosError<unknown>, CommentContext>(
    async ({ ideaId, commentId, content }) => {
      await getApiInstance().put(`${getCommentUrl(ideaId)}/${commentId}`, {
        content,
      });
    },
  );

export const useDeleteIdeaComment = () =>
  useMutation<unknown, AxiosError<unknown>, CommentContext>(
    async ({ ideaId, commentId }) => {
      await getApiInstance().delete(`${getCommentUrl(ideaId)}/${commentId}`);
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
  useQuery(
    [`${getNestedCommentUrl(ideaId, commentId)}`, ideaId, commentId] as const,
    async ({ queryKey }) => {
      const ideaId = queryKey[1];
      const commentId = queryKey[2];
      const { data } = await getApiInstance().get<ReadCommentsData>(
        `${getNestedCommentUrl(ideaId, commentId)}`,
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
  return useMutation<unknown, AxiosError<unknown>, string>(async (content) => {
    await getApiInstance().post(getNestedCommentUrl(ideaId, commentId), {
      content,
    });
  });
};

export const useUpdateIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, NestedCommentContext>(
    async ({ ideaId, commentId, content, nestedCommentId }) => {
      await getApiInstance().put(
        `${getNestedCommentUrl(ideaId, commentId)}/${nestedCommentId}`,
        { content },
      );
    },
  );

export const useDeleteIdeaNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, NestedCommentContext>(
    async ({ ideaId, commentId, nestedCommentId }) => {
      await getApiInstance().delete(
        `${getNestedCommentUrl(ideaId, commentId)}/${nestedCommentId}`,
      );
    },
  );
