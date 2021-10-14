import React from 'react';
import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from '@src/components/common/Input';

export default {
  title: 'Common/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (props) => <Input {...props} />;

export const input = Template.bind({});

input.args = {
  maxWidth: false,
  password: false,
  disabled: false,
  error: false,
  errorMessage: '',
  placeholder: '텍스트를 입력해주세요.',
};
