import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import NestedCommentBox from '@src/components/Comment/NestedCommentBox';
import {
  useUpdateIdeaNestedComment,
  useDeleteIdeaNestedComment,
} from '@src/hooks/useIdeaCommentQuery';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import ConfirmModal from '@src/components/modals/ConfirmModal';
import { ConfirmText, GuideText } from '@src/constant/enums';
import { getErrorText } from '@src/utils/common';
import { Comment } from '@src/models';

interface IdeaNestedCommentContainerProps {
  ideaId: number;
  commentId: number;
  nestedComment: Comment;
  isMine: boolean;
}

const IdeaNestedCommentContainer = ({
  ideaId,
  commentId,
  nestedComment,
  isMine,
}: IdeaNestedCommentContainerProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<string>('');

  const updateMutation = useUpdateIdeaNestedComment();
  const deleteMutation = useDeleteIdeaNestedComment();

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

  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(
      `/ideas/${ideaId}/comments/${commentId}/child-comments`,
    );
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
      { ideaId, commentId, nestedCommentId: nestedComment.id },
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

  const updateComment = () => {
    updateMutation.mutate(
      {
        ideaId,
        commentId: commentId,
        nestedCommentId: nestedComment.id,
        content: editTarget,
      },
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

    setEditTarget(editTarget);
    showConfirm(ConfirmText.UPDATE);
  };

  const clickDeleteBtn = () => {
    showConfirm(ConfirmText.DELETE);
  };

  const clickUpdateBtn = () => {
    setIsEditing(true);
    nestedComment.content.length && setEditTarget(nestedComment.content);
  };

  const clickCancelUpdateBtn = () => {
    setIsEditing(false);
  };

  return (
    <>
      <NestedCommentBox
        nestedComment={nestedComment}
        isMine={isMine}
        clickUpdateBtn={clickUpdateBtn}
        clickDeleteBtn={clickDeleteBtn}
        clickCancelUpdateBtn={clickCancelUpdateBtn}
        clickCompleteUpdateBtn={clickCompleteUpdateBtn}
        isEditing={isEditing}
        editTarget={editTarget}
        setEditTarget={setEditTarget}
      />
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

export default IdeaNestedCommentContainer;
