import React from 'react';
import { Story, Meta } from '@storybook/react';

import AlertModal from '@src/components/modals/AlertModal';
import IdeaFormModal, {
  IdeaFormModalProps,
} from '@src/components/modals/IdeaFormModal';
import useModalControl from '@src/hooks/useModalControl';
import Button from '@src/components/common/Button';

export default {
  title: 'Components/IdeaFormModal',
} as Meta;

export const view: Story<IdeaFormModalProps> = () => {
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isIdeaFormVisible,
    showModal: showIdeaForm,
    hideModal: hideIdeaForm,
  } = useModalControl();

  return (
    <>
      <Button
        onClick={() => {
          showIdeaForm();
        }}
      >
        MODAL 열기
      </Button>
      {isIdeaFormVisible && (
        <IdeaFormModal hideIdeaForm={hideIdeaForm} showAlert={showAlert} />
      )}
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </>
  );
};
