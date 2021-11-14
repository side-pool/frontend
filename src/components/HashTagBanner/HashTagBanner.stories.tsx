import React from 'react';
import { Meta, Story } from '@storybook/react';
import HashTagCircle, {
  HashTagCircleProps,
} from '@src/components/HashTagBanner/HashTagCircle';
import HashTagBanner from '.';

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
  count: 50,
  word: '#악',
  opacity: 0.7,
};

const hashTagArr = [
  { count: 50, word: '#악' },
  { count: 80, word: '#악악' },
  { count: 60, word: '#악악' },
  { count: 35, word: '#악악' },
  { count: 30, word: '#악악악' },
  { count: 10, word: '#악악악악' },
];

export const hashTagBanner = () => {
  return <HashTagBanner hashTagInfos={hashTagArr} />;
};
