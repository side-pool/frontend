import React, { useState } from 'react';
import CommentBox from '@src/components/Comment/CommentBox';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import SideNestedCommentForm from '@src/components/SideComment/SideNestedCommentForm';
import SideNestedCommentBox from '@src/components/SideComment/SideNestedCommentBox';
import {
  useDeleteSideComment,
  useUpdateSideComment,
} from '@src/hooks/useSideCommentQuery';
import { useQueryClient } from 'react-query';
import useModalControl from '@src/hooks/useModalControl';
import { GuideText, ConfirmText } from '@src/constant/enums';
import AlertModal from '@src/components/modals/AlertModal';
import ConfirmModal from '@src/components/modals/ConfirmModal';
import { getErrorText } from '@src/utils/common';
import { SideComment } from '@src/models';

interface Props {
  sideId: number;
  comment: SideComment;
}

const SideCommentBoxContainer = ({ sideId, comment }: Props) => {
  const [isNestedOpened, setIsNestedOpened] = useState(false);
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
  const updateMutation = useUpdateSideComment();
  const deleteMutation = useDeleteSideComment();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(`/sides/${sideId}/comments`);
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
      { sideId, commentId: comment.id },
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
      { sideId, commentId: comment.id, content: editTarget },
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
        commentTag={comment.commentTag}
      />
      {isNestedOpened && (
        <>
          <SideNestedCommentBox sideId={sideId} commentId={comment.id} />
          <SideNestedCommentForm sideId={sideId} commentId={comment.id} />
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

export default SideCommentBoxContainer;
