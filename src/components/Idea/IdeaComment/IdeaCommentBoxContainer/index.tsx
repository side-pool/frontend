import React, { useState } from 'react';
import { Comment } from '@src/models';
import CommentBox from '@src/components/Comment/CommentBox';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import IdeaNestedCommentForm from '@src/components/Idea/IdeaComment/IdeaNestedCommentForm';
import IdeaNestedCommentBox from '@src/components/Idea/IdeaComment/IdeaNestedCommentBox';
import {
  useDeleteIdeaComment,
  useUpdateIdeaComment,
} from '@src/hooks/useIdeaCommentQuery';

interface Props {
  ideaId: number;
  comment: Comment;
}

const IdeaCommentBoxContainer = ({ ideaId, comment }: Props) => {
  const [isNestedOpened, setIsNestedOpened] = useState(false);
  const { data: myData } = useCheckAuth();
  const updateMutation = useUpdateIdeaComment();
  const deleteMutation = useDeleteIdeaComment();

  return (
    <>
      <CommentBox
        key={comment.id}
        comment={comment}
        ideaId={ideaId}
        isNestedOpened={isNestedOpened}
        setIsNestedOpened={setIsNestedOpened}
        isMine={(myData?.id ?? null) === comment.author.id}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
      {isNestedOpened && (
        <>
          <IdeaNestedCommentBox ideaId={ideaId} commentId={comment.id} />
          <IdeaNestedCommentForm ideaId={ideaId} commentId={comment.id} />
        </>
      )}
    </>
  );
};

export default IdeaCommentBoxContainer;
