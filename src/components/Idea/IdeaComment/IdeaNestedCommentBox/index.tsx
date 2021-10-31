import NestedCommentBox from '@src/components/Comment/NestedCommentBox/NestedCommentBox';
import { useReadIdeaNestedComments } from '@src/hooks/useIdeaCommentQuery';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import React from 'react';

interface IdeaNestedCommentBox {
  ideaId: number;
  commentId: number;
}

const IdeaNestedCommentBox = ({ ideaId, commentId }: IdeaNestedCommentBox) => {
  const { data: dataArr, isSuccess } = useReadIdeaNestedComments({
    ideaId,
    commentId,
  });
  const { isSuccess: isAuth } = useCheckAuth();

  return (
    <>
      {isSuccess &&
        dataArr?.map((comment) => (
          <NestedCommentBox
            key={comment.id}
            comment={comment}
            isAuth={isAuth}
          />
        ))}
    </>
  );
};

export default IdeaNestedCommentBox;
