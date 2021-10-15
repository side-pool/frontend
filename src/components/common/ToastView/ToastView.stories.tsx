import React from 'react';
import { Story, Meta } from '@storybook/react';
import ToastView, { ToastProps } from '@src/components/common/ToastView';

export default {
  title: 'Common/Toast View',
  component: ToastView,
} as Meta;

const Template: Story<ToastProps> = (props) => <ToastView {...props} />;
export const toastView = Template.bind({});

toastView.args = {
  message: 'message',
};
