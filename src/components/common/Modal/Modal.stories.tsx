import React from 'react';
import { Story, Meta } from '@storybook/react';

import useModal from '@src/hooks/useModal';

import Button from '@src/components/common/Button';
import Skeleton from '@src/components/common/Skeleton';

export default {
  title: 'Modal',
} as Meta;

const Template: Story = (props) => {
  const { show, hide, RenderModal } = useModal();

  return (
    <div>
      <Button size="xxs" onClick={show}>
        MODAL 열기
      </Button>
      <RenderModal
        {...props}
        footer={{
          cancelButton: (
            <Button buttonColor="gray" onClick={hide} variant="ghost">
              취소
            </Button>
          ),
          submitButton: <Button buttonColor="blue">확인</Button>,
          BtnAlign: 'end',
        }}
      >
        <>
          <Skeleton maxWidth />
          <Skeleton maxWidth />
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
  width: 200,
};
