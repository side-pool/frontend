import React, { useState } from 'react';
import { Comment } from '@src/models';
import CommentBox from '@src/components/Comment/CommentBox';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import IdeaNestedCommentForm from '@src/components/Idea/IdeaComment/IdeaNestedCommentForm';
import IdeaNestedCommentBox from '@src/components/Idea/IdeaComment/IdeaNestedCommentBox';

interface Props {
  ideaId: number;
  comment: Comment;
}

const IdeaCommentBoxContainer = ({ ideaId, comment }: Props) => {
  const [isNestedOpened, setIsNestedOpened] = useState(false);
  const [isNestedFormOpened, setIsNestedFormOpened] = useState(false);
  const { isSuccess: isAuth } = useCheckAuth();

  return (
    <>
      <CommentBox
        key={comment.id}
        comment={comment}
        isNestedFormOpened={isNestedFormOpened}
        setIsNestedFormOpened={setIsNestedFormOpened}
        isNestedOpened={isNestedOpened}
        setIsNestedOpened={setIsNestedOpened}
        isAuth={isAuth}
      />
      {isNestedOpened && (
        <IdeaNestedCommentBox ideaId={ideaId} commentId={comment.id} />
      )}
      {isNestedFormOpened && (
        <IdeaNestedCommentForm ideaId={ideaId} commentId={comment.id} />
      )}
    </>
  );
};

export default IdeaCommentBoxContainer;
