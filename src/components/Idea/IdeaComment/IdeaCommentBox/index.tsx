import React from 'react';
import { useReadIdeaComments } from '@src/hooks/useIdeaCommentQuery';
import IdeaCommentBoxContainer from '@src/components/Idea/IdeaComment/IdeaCommentBoxContainer';

interface CommentContainerProps {
  ideaId: number;
}

const IdeaCommentBox = ({ ideaId }: CommentContainerProps) => {
  const { data: dataArr, isSuccess } = useReadIdeaComments(ideaId);

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
    </>
  );
};

export default IdeaCommentBox;
