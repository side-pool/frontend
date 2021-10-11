import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '@src/components/common/Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const button = Template.bind({});

button.args = {
  variant: 'normal',
  primary: false,
  disabled: false,
  fullWidth: false,
  labelText: 'TEST',
};
