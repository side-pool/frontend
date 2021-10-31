import React, { useRef } from 'react';
import CommentForm from '@src/components/Comment/CommentForm';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import { useCreateIdeaComment } from '@src/hooks/useIdeaCommentQuery';

interface IdeaCommentFormProps {
  ideaId: number;
}

const IdeaCommentForm = ({ ideaId }: IdeaCommentFormProps) => {
  const commentRef = useRef({} as ParentRef);
  const authResult = useCheckAuth();
  const createCommentMutation = useCreateIdeaComment();

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
      { ideaId, content },
      {
        onSuccess: () => {
          // TODO: Modal 로 바꾸기
          alert('성공');
        },
        onError: () => {
          alert('실패');
        },
      },
    );
  };

  const handleConfirm = () => {
    hideAlert();
  };

  return (
    <>
      {authResult.isSuccess && (
        <CommentForm
          nickname={authResult.data.nickname}
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
