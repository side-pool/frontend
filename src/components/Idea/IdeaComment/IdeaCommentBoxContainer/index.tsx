import React, { useState } from 'react';
import { Comment } from '@src/models';
import CommentBox from '@src/components/Comment/CommentBox';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import IdeaNestedCommentForm from '@src/components/Idea/IdeaComment/IdeaNestedCommentForm';
import IdeaNestedCommentBox from '@src/components/Idea/IdeaComment/IdeaNestedCommentBox';
import {
  useDeleteIdeaComment,
  useUpdateIdeaComment,
} from '@src/hooks/useIdeaCommentQuery';
import { useQueryClient } from 'react-query';
import useModalControl from '@src/hooks/useModalControl';
import { GuideText, ConfirmText } from '@src/constant/enums';
import AlertModal from '@src/components/modals/AlertModal';
import ConfirmModal from '@src/components/modals/ConfirmModal';
import { getErrorText } from '@src/utils/common';

interface Props {
  ideaId: number;
  comment: Comment;
}

const IdeaCommentBoxContainer = ({ ideaId, comment }: Props) => {
  const [isNestedOpened, setIsNestedOpened] = useState(false);
  // TODO: 지금은 update 와 UI 조작을 위해 상위 컴포넌트에서 많은 상태를 들고 있다. 리팩터링해보자.
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<string>('');

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isConfirmVisible,
    modalMessage: confirmMessage,
    showModal: showConfirm,
    hideModal: hideConfirm,
  } = useModalControl();

  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);
  const updateMutation = useUpdateIdeaComment();
  const deleteMutation = useDeleteIdeaComment();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(`/ideas/${ideaId}/comments`);
  };

  const switchConfirm = () => {
    switch (confirmMessage) {
      case ConfirmText.DELETE:
        deleteComment();
        hideConfirm();
        return;
      case ConfirmText.UPDATE:
        updateComment();
        hideConfirm();
        return;
    }
  };

  const deleteComment = () => {
    deleteMutation.mutate(
      { ideaId, commentId: comment.id },
      {
        onSuccess: () => {
          invalidate();
        },
        onError: (error) => {
          showAlert(getErrorText(error));
        },
      },
    );
  };

  const updateComment = () => {
    updateMutation.mutate(
      { ideaId, commentId: comment.id, content: editTarget },
      {
        onSuccess: () => {
          invalidate();
          setIsEditing(false);
        },
        onError: (error) => {
          showAlert(getErrorText(error));
        },
      },
    );
  };

  const clickCompleteUpdateBtn = () => {
    if (editTarget.length === 0) {
      showAlert(GuideText.FILL_A_FORM);
      return;
    }

    showConfirm(ConfirmText.UPDATE);
  };

  const clickDeleteBtn = () => {
    showConfirm(ConfirmText.DELETE);
  };

  const clickUpdateBtn = () => {
    setIsEditing(true);
    setEditTarget(comment.content);
  };

  const clickCancelUpdateBtn = () => {
    setIsEditing(false);
  };

  return (
    <>
      <CommentBox
        key={comment.id}
        comment={comment}
        isNestedOpened={isNestedOpened}
        setIsNestedOpened={setIsNestedOpened}
        isMine={(userData?.id ?? null) === comment.author.id}
        clickUpdateBtn={clickUpdateBtn}
        clickDeleteBtn={clickDeleteBtn}
        clickCancelUpdateBtn={clickCancelUpdateBtn}
        clickCompleteUpdateBtn={clickCompleteUpdateBtn}
        isEditing={isEditing}
        editTarget={editTarget}
        setEditTarget={setEditTarget}
      />
      {isNestedOpened && (
        <>
          <IdeaNestedCommentBox ideaId={ideaId} commentId={comment.id} />
          <IdeaNestedCommentForm ideaId={ideaId} commentId={comment.id} />
        </>
      )}
      {isAlertVisible && (
        <>
          <AlertModal content={alertMessage} handleConfirm={hideAlert} />
        </>
      )}
      {isConfirmVisible && (
        <>
          <ConfirmModal
            content={confirmMessage}
            handleConfirm={switchConfirm}
            handleCancel={hideConfirm}
          />
        </>
      )}
    </>
  );
};

export default IdeaCommentBoxContainer;
