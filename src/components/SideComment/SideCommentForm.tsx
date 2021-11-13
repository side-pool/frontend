import React, { useRef } from 'react';
import { useQueryClient } from 'react-query';
import CommentForm from '@src/components/Comment/CommentForm';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import { useCreateSideComment } from '@src/hooks/useSideCommentQuery';
import { getErrorText } from '@src/utils/common';
import { useSideState } from '@src/store';

interface SideCommentForm {
  sideId: number;
}

const SideCommentForm = ({ sideId }: SideCommentForm) => {
  const commentRef = useRef({} as ParentRef);
  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);
  const { commentTag } = useSideState();

  const createCommentMutation = useCreateSideComment(sideId);
  const queryClient = useQueryClient();

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const content = commentRef.current.get();

    if (!content) {
      showAlert(GuideText.FILL_A_FORM);
      return;
    }

    // submit to server
    createCommentMutation.mutate(
      { content, commentTag },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`/sides/${sideId}/comments`);
          commentRef.current.reset();
        },
        onError: (error) => {
          showAlert(getErrorText(error));
        },
      },
    );
  };

  const handleConfirm = () => {
    hideAlert();
  };

  return (
    <>
      {isAuth && (
        <CommentForm
          nickname={userData?.nickname ?? ''}
          commentRef={commentRef}
          onSubmit={handleSubmit}
          isSide
        />
      )}
      {isAlertVisible && (
        <>
          <AlertModal content={alertMessage} handleConfirm={handleConfirm} />
        </>
      )}
    </>
  );
};

export default SideCommentForm;
