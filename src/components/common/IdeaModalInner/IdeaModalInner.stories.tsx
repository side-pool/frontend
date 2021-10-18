import React from 'react';
import { Story, Meta } from '@storybook/react';

import useModal from '@src/hooks/useModal';
import { ModalProps } from '@src/components/common/Modal';

import Button from '@src/components/common/Button';
import IdeaModalInner from '@src/components/common/IdeaModalInner';

export default {
  title: 'Common/Idea Modal Inner',
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
          submitButton: <Button primary>등록</Button>,
        }}
      >
        <IdeaModalInner />
      </RenderModal>
    </div>
  );
};

export const ideaModalInner = Template.bind({});

ideaModalInner.args = {
  variant: 'default',
  headerText: '아이디어 제안하기',
  zIndex: 10,
  isWide: true,
};
