import React from 'react';
import { useReadSideNestedComments } from '@src/hooks/useSideCommentQuery';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import ForbiddenComment from '@src/components/Comment/ForbiddenComment';
import SideNestedCommentBoxContainer from './SideNestedCommentBoxContainer';

interface SideNestedCommentBoxProps {
  sideId: number;
  commentId: number;
}

const SideNestedCommentBox = ({
  sideId,
  commentId,
}: SideNestedCommentBoxProps) => {
  const { data: dataArr, isSuccess } = useReadSideNestedComments({
    sideId,
    commentId,
  });
  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);

  return (
    <>
      {isSuccess &&
        dataArr?.map((nestedComment) => (
          <SideNestedCommentBoxContainer
            key={nestedComment.id}
            sideId={sideId}
            commentId={commentId}
            nestedComment={nestedComment}
            isMine={(userData?.id ?? null) === nestedComment.author.id}
          />
        ))}
      {!isAuth && dataArr?.length === 0 && <ForbiddenComment isNested={true} />}
    </>
  );
};

export default SideNestedCommentBox;
