import React from 'react';
import { Meta, Story } from '@storybook/react';
import Alarm, { AlarmProps } from '@src/components/Alarm/index';

export default {
  title: 'Components/Alarm',
  component: Alarm,
} as Meta;

const Template: Story<AlarmProps> = (props) => <Alarm {...props} />;

export const alarm = Template.bind({});

alarm.args = {
  postType: 'idea',
  title: 'This is title.',
  content:
    'This is content. And this is little bit longlonglonglonglonglonglonglonglonglonglonglong',
};
