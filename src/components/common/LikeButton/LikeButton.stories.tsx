import React from 'react';
import { Story, Meta } from '@storybook/react';
import LikeButton, { LikeButtonProps } from '@src/components/common/LikeButton';

export default {
  title: 'Common/LikeButton',
  component: LikeButton,
} as Meta;

const Template: Story<LikeButtonProps> = (props) => <LikeButton {...props} />;

export const likeButton = Template.bind({});

likeButton.args = {
  count: 23,
};
