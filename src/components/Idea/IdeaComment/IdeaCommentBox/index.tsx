import React from 'react';
import { useReadIdeaComments } from '@src/hooks/useIdeaCommentQuery';
import IdeaCommentBoxContainer from '@src/components/Idea/IdeaComment/IdeaCommentBoxContainer';
import ForbiddenComment from '@src/components/Comment/ForbiddenComment';
import { useCheckAuth } from '@src/hooks/useUserQuery';

interface CommentContainerProps {
  ideaId: number;
}

const IdeaCommentBox = ({ ideaId }: CommentContainerProps) => {
  const { data: dataArr, isSuccess } = useReadIdeaComments(ideaId);
  const { isError: isLogout } = useCheckAuth();

  return (
    <>
      {isSuccess &&
        dataArr?.map((comment) => (
          <IdeaCommentBoxContainer
            key={comment.id}
            ideaId={ideaId}
            comment={comment}
          />
        ))}
      {isLogout && dataArr?.length === 0 && <ForbiddenComment />}
    </>
  );
};

export default IdeaCommentBox;
