import React from 'react';
import { Story, Meta } from '@storybook/react';
import Skeleton, { SkeletonProps } from '@src/components/common/Skeleton';

export default {
  title: 'Common/Skeleton',
  component: Skeleton,
  argTypes: {
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<SkeletonProps> = (props) => <Skeleton {...props} />;

export const skeleton = Template.bind({});

skeleton.args = {
  variant: 'rect',
  animation: 'wave',
  size: 'xl',
  fitContent: false,
  maxWidth: false,
  withChildren: false,
};
