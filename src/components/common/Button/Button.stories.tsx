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
  size: 'md',
  variant: 'solid',
  disabled: false,
  fullWidth: false,
  rounded: false,
  shadow: false,
  buttonColor: 'black',
  labelText: 'TEST',
};
