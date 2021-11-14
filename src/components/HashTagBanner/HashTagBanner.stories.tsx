import React from 'react';
import { Meta, Story } from '@storybook/react';
import HashTagCircle, {
  HashTagCircleProps,
} from '@src/components/HashTagBanner/HashTagCircle';

export default {
  title: 'components/HashTagCircle',
  component: HashTagCircle,
} as Meta;

const WIDTH = '1021';
const HEIGHT = '180';

const Template: Story<HashTagCircleProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={WIDTH} height={HEIGHT}>
    <HashTagCircle {...props} />
  </svg>
);

export const hashCircle = Template.bind({});

hashCircle.args = {
  count: 3,
  word: '#악',
  opacity: 0.7,
};
