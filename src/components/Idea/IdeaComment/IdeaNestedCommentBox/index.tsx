import React from 'react';
import { useReadIdeaNestedComments } from '@src/hooks/useIdeaCommentQuery';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import ForbiddenComment from '@src/components/Comment/ForbiddenComment';
import IdeaNestedCommentContainer from '../IdeaNestedCommentContainer/indext';

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

  return (
    <>
      {isSuccess &&
        dataArr?.map((nestedComment) => (
          <IdeaNestedCommentContainer
            key={nestedComment.id}
            ideaId={ideaId}
            commentId={commentId}
            nestedComment={nestedComment}
            isMine={(userData?.id ?? null) === nestedComment.author.id}
          />
        ))}
      {!isAuth && dataArr?.length === 0 && <ForbiddenComment isNested={true} />}
    </>
  );
};

export default IdeaNestedCommentBox;
