import React from 'react';
import { Meta, Story } from '@storybook/react';
import AlarmCard, { AlarmCardProps } from '@src/components/AlarmCard';

export default {
  title: 'Components/Alarm Card',
  component: AlarmCard,
} as Meta;

const Template: Story<AlarmCardProps> = (props) => <AlarmCard {...props} />;

export const alarmCard = Template.bind({});

alarmCard.args = {
  postType: 'idea',
  title: 'This is title.',
  content:
    'This is content. And this is little bit longlonglonglonglonglonglonglonglonglonglonglong',
};
