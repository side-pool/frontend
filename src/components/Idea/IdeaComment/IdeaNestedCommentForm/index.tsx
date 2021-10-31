import React, { useRef } from 'react';
import { useCheckAuth } from '@src/hooks/useUserQuery';
import { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import { useCreateIdeaNestedComment } from '@src/hooks/useIdeaCommentQuery';
import NestedCommentForm from '@src/components/Comment/NestedCommentForm';

interface IdeaNestedCommentFormProps {
  ideaId: number;
  commentId: number;
}

const IdeaNestedCommentForm = ({
  ideaId,
  commentId,
}: IdeaNestedCommentFormProps) => {
  const commentRef = useRef({} as ParentRef);
  const authResult = useCheckAuth();
  const creatCommentMutation = useCreateIdeaNestedComment();

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const submitComment = (event: React.FormEvent) => {
    event.preventDefault();

    const content = commentRef.current.get();

    if (!content) {
      showAlert(GuideText.FILL_A_FORM);
      return;
    }

    // submit to server
    creatCommentMutation.mutate(
      { ideaId, commentId, content },
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
        <NestedCommentForm
          nickname={authResult.data.nickname}
          commentRef={commentRef}
          onSubmit={submitComment}
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

export default IdeaNestedCommentForm;
