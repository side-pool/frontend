import React from 'react';
import { Story, Meta } from '@storybook/react';

import useModal from '@src/hooks/useModal';
import { ModalProps } from '@src/components/common/Modal';

import Button from '@src/components/common/Button';
import Skeleton from '@src/components/common/Skeleton';

export default {
  title: 'Modal',
} as Meta;

const Template: Story<ModalProps> = (props) => {
  const { show, hide, RenderModal } = useModal();

  return (
    <div>
      <Button onClick={show}>MODAL 열기</Button>
      <RenderModal
        {...props}
        footer={{
          cancelButton: <Button onClick={hide}>취소</Button>,
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
      </RenderModal>
    </div>
  );
};

export const modal = Template.bind({});

modal.args = {
  variant: 'default',
  headerText: 'modal',
  zIndex: 10,
};
