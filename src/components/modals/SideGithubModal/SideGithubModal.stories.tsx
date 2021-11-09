import React from 'react';
import { Story, Meta } from '@storybook/react';

import AlertModal from '@src/components/modals/AlertModal';
import SideGithubModal, {
  SideGithubModalProps,
} from '@src/components/modals/SideGithubModal';
import useModalControl from '@src/hooks/useModalControl';
import Button from '@src/components/common/Button';

export default {
  title: 'Components/SideGithubModal',
} as Meta;

export const view: Story<SideGithubModalProps> = () => {
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
        <SideGithubModal hideModal={hideIdeaForm} showAlert={showAlert} />
      )}
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </>
  );
};

export const initValue: Story<SideGithubModalProps> = () => {
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
        <SideGithubModal hideModal={hideIdeaForm} showAlert={showAlert} />
      )}
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </>
  );
};
