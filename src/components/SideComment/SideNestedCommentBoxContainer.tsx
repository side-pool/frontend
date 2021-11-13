import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import NestedCommentBox from '@src/components/Comment/NestedCommentBox';
import {
  useUpdateSideNestedComment,
  useDeleteSideNestedComment,
} from '@src/hooks/useSideCommentQuery';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import ConfirmModal from '@src/components/modals/ConfirmModal';
import { ConfirmText, GuideText } from '@src/constant/enums';
import { getErrorText } from '@src/utils/common';
import { SideComment } from '@src/models';

interface SideNestedCommentContainerProps {
  sideId: number;
  commentId: number;
  nestedComment: SideComment;
  isMine: boolean;
}

const SideNestedCommentContainer = ({
  sideId,
  commentId,
  nestedComment,
  isMine,
}: SideNestedCommentContainerProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<string>('');

  const updateMutation = useUpdateSideNestedComment();
  const deleteMutation = useDeleteSideNestedComment();

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
      `/ideas/${sideId}/comments/${commentId}/child-comments`,
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
      { sideId, commentId, nestedCommentId: nestedComment.id },
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
        sideId,
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

    showConfirm(ConfirmText.UPDATE);
  };

  const clickDeleteBtn = () => {
    showConfirm(ConfirmText.DELETE);
  };

  const clickUpdateBtn = () => {
    setIsEditing(true);
    setEditTarget(nestedComment.content);
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

export default SideNestedCommentContainer;
