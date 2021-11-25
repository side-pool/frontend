import React from 'react';
import { Story } from '@storybook/react';
import Lottie, { LottieProps } from '@src/components/common/Lottie';

export default {
  title: 'Common/Lottie',
  component: Lottie,
};

const Template: Story<LottieProps> = (props: LottieProps) => (
  <Lottie {...props} />
);

export const lottie = Template.bind({});

lottie.args = {
  activeTime: 'oneWeek',
};
