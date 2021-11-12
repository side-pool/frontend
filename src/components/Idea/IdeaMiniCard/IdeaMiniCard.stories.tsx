import React from 'react';
import { Meta, Story } from '@storybook/react';
import IdeaMiniCard from '@src/components/Idea/IdeaMiniCard';
import { MiniIdea } from '@src/models';

export default {
  title: 'Components/Idea Mini Card',
  component: IdeaMiniCard,
} as Meta;

const Template: Story<MiniIdea> = (props) => <IdeaMiniCard {...props} />;

export const ideaMiniCard = Template.bind({});

ideaMiniCard.args = {
  title: '게슈탈트 붕괴',
  hashtags: ['어쩌구', '저쩌구', '그래요', '저래요'],
  isDone: true,
  content:
    'djsdfsdfsdfsdfdsfsdfdjsdfsdfsdfsdfdsfsdfdjsdfsdfsdfsdfdsfsdfdjsdfsdfsdfsdfdsfsdfdjsdfsdfsdfsdfdsfsdfdjsdfsdfsdfsdfdsfsdfdjsdfsdfsdfsdfdsfsdf',
};
