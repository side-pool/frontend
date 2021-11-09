import React, { useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import {
  getNestedCommentUrl,
  useCreateIdeaNestedComment,
} from '@src/hooks/useIdeaCommentQuery';
import NestedCommentForm from '@src/components/Comment/NestedCommentForm';
import { getErrorText } from '@src/utils/common';

interface IdeaNestedCommentFormProps {
  ideaId: number;
  commentId: number;
}

const IdeaNestedCommentForm = ({
  ideaId,
  commentId,
}: IdeaNestedCommentFormProps) => {
  const commentRef = useRef({} as ParentRef);
  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);
  const creatCommentMutation = useCreateIdeaNestedComment(ideaId, commentId);
  const queryClient = useQueryClient();

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
    creatCommentMutation.mutate(content, {
      onSuccess: () => {
        queryClient.invalidateQueries(getNestedCommentUrl(ideaId, commentId));
        commentRef.current.reset();
      },
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
        <NestedCommentForm
          nickname={userData?.nickname ?? ''}
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
