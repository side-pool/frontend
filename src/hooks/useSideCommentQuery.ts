import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ReadSidesCommentData } from '@src/models';
import { getApiInstance } from '@src/utils/context';

// 기본 댓글 태그, 칭찬
const DEFAULT_TAG = 0;

export type CommentContext = {
  sideId: number;
  commentId: number;
  commentTag?: number;
  content?: string;
};

export type CommentCreateContext = Omit<CommentContext, 'sideId' | 'commentId'>;

export type NestedCommentContext = {
  nestedCommentId: number;
} & Omit<CommentContext, 'commentTag'>;

export const getCommentUrl = (sideId: number) => `/sides/${sideId}/comments`;

export const getNestedCommentUrl = (sideId: number, commentId: number) =>
  `${getCommentUrl(sideId)}/${commentId}/child-comments`;

export const useReadSideComments = (sideId: number) =>
  useQuery(
    [`${getCommentUrl(sideId)}`, sideId] as const,
    async ({ queryKey }) => {
      const sideId = queryKey[1];
      const { data } = await getApiInstance().get<ReadSidesCommentData>(
        `${getCommentUrl(sideId)}`,
      );
      // TODO: reverse 안 쓰도록 수정
      return data?.reverse();
    },
    { refetchOnWindowFocus: false, retry: false },
  );

export const useCreateSideComment = (sideId: number) => {
  return useMutation<unknown, AxiosError<unknown>, CommentCreateContext>(
    async ({ content, commentTag = DEFAULT_TAG }) => {
      await getApiInstance().post(getCommentUrl(sideId), {
        content,
        commentTag,
      });
    },
  );
};

export const useUpdateSideComment = () =>
  useMutation<unknown, AxiosError<unknown>, CommentContext>(
    async ({ sideId, commentId, content, commentTag = DEFAULT_TAG }) => {
      await getApiInstance().put(`${getCommentUrl(sideId)}/${commentId}`, {
        content,
        commentTag,
      });
    },
  );

export const useDeleteSideComment = () =>
  useMutation<unknown, AxiosError<unknown>, CommentContext>(
    async ({ sideId, commentId }) => {
      await getApiInstance().delete(`${getCommentUrl(sideId)}/${commentId}`);
    },
  );

interface readNestedCommentsProps {
  sideId: number;
  commentId: number;
}

export const useReadSideNestedComments = ({
  sideId,
  commentId,
}: readNestedCommentsProps) =>
  useQuery(
    [`${getNestedCommentUrl(sideId, commentId)}`, sideId, commentId] as const,
    async ({ queryKey }) => {
      const sideId = queryKey[1];
      const commentId = queryKey[2];
      const { data } = await getApiInstance().get<ReadSidesCommentData>(
        `${getNestedCommentUrl(sideId, commentId)}`,
      );
      // TODO: reverse 안 쓰도록 수정
      return data?.reverse();
    },
    { refetchOnWindowFocus: false, retry: false },
  );

export const useCreateSideNestedComment = (
  sideId: number,
  commentId: number,
) => {
  return useMutation<unknown, AxiosError<unknown>, string>(async (content) => {
    await getApiInstance().post(getNestedCommentUrl(sideId, commentId), {
      content,
    });
  });
};

export const useUpdateSideNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, NestedCommentContext>(
    async ({ sideId, commentId, content, nestedCommentId }) => {
      await getApiInstance().put(
        `${getNestedCommentUrl(sideId, commentId)}/${nestedCommentId}`,
        { content },
      );
    },
  );

export const useDeleteSideNestedComment = () =>
  useMutation<unknown, AxiosError<unknown>, NestedCommentContext>(
    async ({ sideId, commentId, nestedCommentId }) => {
      await getApiInstance().delete(
        `${getNestedCommentUrl(sideId, commentId)}/${nestedCommentId}`,
      );
    },
  );
