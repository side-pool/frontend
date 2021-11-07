import React, { useRef } from 'react';
import { useQueryClient } from 'react-query';
import SimilarForm from '@src/components/Idea/SimilarService/SimilarForm';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import { getErrorText } from '@src/utils/common';
import { getSimilarUrl, useCreateSimilar } from '@src/hooks/useSimilarQuery';

interface SimilarFormProps {
  ideaId: number;
}

const SimilarFormContainer = ({ ideaId }: SimilarFormProps) => {
  const urlRef = useRef({} as ParentRef);
  const descRef = useRef({} as ParentRef);
  const queryClient = useQueryClient();
  const { data: isAuth } = useAuth();
  const { data: userData } = useGetUser(isAuth ?? false);
  const createSimilarMutation = useCreateSimilar(ideaId);

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const url = urlRef.current.get();
    const description = descRef.current.get();

    if (!url || !description) {
      showAlert(GuideText.FILL_ALL_FORM);
      return;
    }

    // submit to server
    createSimilarMutation.mutate(
      { url, description },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(getSimilarUrl(ideaId));
          urlRef.current.reset();
          descRef.current.reset();
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
        <SimilarForm
          nickname={userData?.nickname ?? ''}
          urlRef={urlRef}
          descRef={descRef}
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

export default SimilarFormContainer;
