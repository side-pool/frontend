import React from 'react';
import { Story, Meta } from '@storybook/react';
import Spinner, { SpinnerProps } from '@src/components/common/Spinner';

export default {
  title: 'Common/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<SpinnerProps> = (props) => <Spinner {...props} />;

export const spinner = Template.bind({});

spinner.args = {
  size: 'md',
};
