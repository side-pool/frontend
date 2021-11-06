import React, { useRef } from 'react';
import CommentForm from '@src/components/Comment/CommentForm';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import { useCreateIdeaComment } from '@src/hooks/useIdeaCommentQuery';
import { getErrorText } from '@src/utils/common';

interface IdeaCommentFormProps {
  ideaId: number;
}

const IdeaCommentForm = ({ ideaId }: IdeaCommentFormProps) => {
  const commentRef = useRef({} as ParentRef);
  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);
  const createCommentMutation = useCreateIdeaComment(ideaId);

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
    createCommentMutation.mutate(content, {
      onError: (error) => {
        showAlert(getErrorText(error));
      },
    });
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

export default IdeaCommentForm;
