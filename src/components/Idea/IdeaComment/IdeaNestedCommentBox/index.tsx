import React from 'react';
import { useQueryClient } from 'react-query';
import NestedCommentBox from '@src/components/Comment/NestedCommentBox';
import { useReadIdeaNestedComments } from '@src/hooks/useIdeaCommentQuery';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import {
  useUpdateIdeaNestedComment,
  useDeleteIdeaNestedComment,
} from '@src/hooks/useIdeaCommentQuery';
import ForbiddenComment from '@src/components/Comment/ForbiddenComment';

interface IdeaNestedCommentBox {
  ideaId: number;
  commentId: number;
}

const IdeaNestedCommentBox = ({ ideaId, commentId }: IdeaNestedCommentBox) => {
  const { data: dataArr, isSuccess } = useReadIdeaNestedComments({
    ideaId,
    commentId,
  });
  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);

  const updateMutation = useUpdateIdeaNestedComment();
  const deleteMutation = useDeleteIdeaNestedComment();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(
      `/ideas/${ideaId}/comments/${commentId}/child-comments`,
    );
  };

  return (
    <>
      {isSuccess &&
        dataArr?.map((nestedComment) => (
          <NestedCommentBox
            key={nestedComment.id}
            ideaId={ideaId}
            commentId={commentId}
            nestedComment={nestedComment}
            isMine={(userData?.id ?? null) === nestedComment.author.id}
            updateMutation={updateMutation}
            deleteMutation={deleteMutation}
            invalidate={invalidate}
          />
        ))}
      {!isAuth && dataArr?.length === 0 && <ForbiddenComment isNested={true} />}
    </>
  );
};

export default IdeaNestedCommentBox;
