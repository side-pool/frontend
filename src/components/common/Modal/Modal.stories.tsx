import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import Modal, { ModalProps } from '@src/components/common/Modal';

import Button from '@src/components/common/Button';
import Skeleton from '@src/components/common/Skeleton';

export default {
  title: 'Common/Modal',
} as Meta;

const Template: Story<ModalProps> = (props) => {
  const [isModalVisible, seIsModalVisible] = useState<boolean>(false);

  const closeModal = () => seIsModalVisible(false);
  const showModal = () => seIsModalVisible(true);

  return (
    <div>
      <Button onClick={showModal}>MODAL 열기</Button>
      <Modal
        {...props}
        isVisible={isModalVisible}
        closeModal={closeModal}
        footer={{
          submitButton: <Button primary>확인</Button>,
        }}
      >
        <>
          abcde
          <Skeleton maxWidth />
          <Skeleton maxWidth />
          <Skeleton maxWidth />
          <Skeleton maxWidth />
          <Skeleton maxWidth />
          <Skeleton maxWidth />
          <Skeleton maxWidth />
          <Skeleton maxWidth />
        </>
      </Modal>
    </div>
  );
};

export const modal = Template.bind({});

modal.args = {
  headerText: 'modal',
  zIndex: 10,
};
