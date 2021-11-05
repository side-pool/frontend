import React from 'react';
import NestedCommentBox from '@src/components/Comment/NestedCommentBox';
import { useReadIdeaNestedComments } from '@src/hooks/useIdeaCommentQuery';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import {
  useUpdateIdeaNestedComment,
  useDeleteIdeaNestedComment,
} from '@src/hooks/useIdeaCommentQuery';

interface IdeaNestedCommentBox {
  ideaId: number;
  commentId: number;
}

const IdeaNestedCommentBox = ({ ideaId, commentId }: IdeaNestedCommentBox) => {
  const { data: dataArr, isSuccess } = useReadIdeaNestedComments({
    ideaId,
    commentId,
  });
  const { data: myData } = useCheckAuth();
  const updateMutation = useUpdateIdeaNestedComment();
  const deleteMutation = useDeleteIdeaNestedComment();

  return (
    <>
      {isSuccess &&
        dataArr?.map((nestedComment) => (
          <NestedCommentBox
            key={nestedComment.id}
            ideaId={ideaId}
            commentId={commentId}
            nestedComment={nestedComment}
            isMine={(myData?.id ?? null) === nestedComment.author.id}
            updateMutation={updateMutation}
            deleteMutation={deleteMutation}
          />
        ))}
    </>
  );
};

export default IdeaNestedCommentBox;
