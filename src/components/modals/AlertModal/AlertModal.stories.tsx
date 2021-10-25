import React from 'react';
import { Story, Meta } from '@storybook/react';

import AlertModal, { AlertModalProps } from '@src/components/modals/AlertModal';
import useModalControl from '@src/hooks/useModalControl';
import Button from '@src/components/common/Button';

export default {
  title: 'Components/AlertModal',
} as Meta;

export const view: Story<AlertModalProps> = () => {
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  return (
    <>
      <Button
        onClick={() => {
          showAlert('안녕하세요. 저는 모달이에요');
        }}
      >
        MODAL 열기
      </Button>
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </>
  );
};

export const withOverlay: Story<AlertModalProps> = () => {
  const {
    isModalVisible: isAlertVisible,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  return (
    <>
      <Button
        onClick={() => {
          showAlert();
        }}
      >
        MODAL 열기
      </Button>
      {isAlertVisible && (
        <AlertModal
          content={'안녕하세요. 저는 모달이에요'}
          handleConfirm={hideAlert}
        />
      )}
    </>
  );
};
