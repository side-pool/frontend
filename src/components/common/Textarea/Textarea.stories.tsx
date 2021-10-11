import React from 'react';
import { Story, Meta } from '@storybook/react';
import Textarea, { TextareaProps } from '@src/components/common/Textarea';

export default {
  title: 'Textarea',
  component: Textarea,
} as Meta;

const Template: Story<TextareaProps> = (props) => <Textarea {...props} />;

export const textarea = Template.bind({});

textarea.args = {
  maxWidth: false,
  disabled: false,
  placeholder: '텍스트를 입력해주세요.',
};
