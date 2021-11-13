import React from 'react';
import { Meta, Story } from '@storybook/react';
import MyCommentCard from '@src/components/Comment/MyCommentCard';
import { MyComment } from '@src/models';

export default {
  title: 'Components/My Comment Card',
  component: MyCommentCard,
} as Meta;

const Template: Story<MyComment> = (props) => <MyCommentCard {...props} />;

export const myCommentCard = Template.bind({});

myCommentCard.args = {
  title: 'This is title.',
  type: '사이드',
  updatedDate: '2021-10-16T01:18:23',
  content:
    'This is content. And this is little bit longlonglonglonglonglonglonglonglonglonglonglong',
};
