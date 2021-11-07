import React, { useState } from 'react';
import { Similar, SimilarState } from '@src/models';
import { useAuth, useGetUser } from '@src/hooks/useUserQuery';
import { useQueryClient } from 'react-query';
import useModalControl from '@src/hooks/useModalControl';
import { GuideText, ConfirmText } from '@src/constant/enums';
import AlertModal from '@src/components/modals/AlertModal';
import ConfirmModal from '@src/components/modals/ConfirmModal';
import { getErrorText } from '@src/utils/common';
import SimilarBox from '@src/components/Idea/SimilarService/SimilarBox';
import {
  getSimilarUrl,
  useDeleteSimilar,
  useUpdateSimilar,
} from '@src/hooks/useSimilarQuery';

interface SimilarBoxContainerProps {
  ideaId: number;
  similar: Similar;
}

const SimilarBoxContainer = ({ ideaId, similar }: SimilarBoxContainerProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<SimilarState>({
    url: '',
    description: '',
  });

  const updateMutation = useUpdateSimilar();
  const deleteMutation = useDeleteSimilar();

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
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(getSimilarUrl(ideaId));
  };

  const switchConfirm = () => {
    switch (confirmMessage) {
      case ConfirmText.DELETE:
        deleteSimilar();
        hideConfirm();
        return;
      case ConfirmText.UPDATE:
        updateSimilar();
        hideConfirm();
        return;
    }
  };

  const deleteSimilar = () => {
    deleteMutation.mutate(
      { ideaId, similarId: similar.id },
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

  const updateSimilar = () => {
    updateMutation.mutate(
      {
        ideaId,
        similarId: similar.id,
        url: editTarget.url,
        description: editTarget.description,
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
    if (Object.values(editTarget).some((state) => state.length === 0)) {
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
    if (similar.description.length !== 0 && similar.url.length !== 0) {
      setEditTarget({
        url: similar.url,
        description: similar.description,
      });
    }
  };

  const clickCancelUpdateBtn = () => {
    setIsEditing(false);
  };

  return (
    <>
      <SimilarBox
        key={similar.id}
        isMine={(userData?.id ?? null) === similar.author.id}
        similar={similar}
        isEditing={isEditing}
        editTarget={editTarget}
        setEditTarget={setEditTarget}
        clickCompleteUpdateBtn={clickCompleteUpdateBtn}
        clickDeleteBtn={clickDeleteBtn}
        clickUpdateBtn={clickUpdateBtn}
        clickCancelUpdateBtn={clickCancelUpdateBtn}
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

export default SimilarBoxContainer;
