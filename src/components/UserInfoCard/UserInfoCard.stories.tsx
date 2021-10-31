import React from 'react';
import { Meta, Story } from '@storybook/react';
import UserInfoCard, { UserInfoCardProps } from '@src/components/UserInfoCard';

export default {
  title: 'Components/User Info Card',
  component: UserInfoCard,
} as Meta;

const Template: Story<UserInfoCardProps> = (props) => (
  <UserInfoCard {...props} />
);

export const userInfoCard = Template.bind({});

userInfoCard.args = {
  nickname: '게슈탈트 붕괴',
  level: 3,
  point: 27,
};
