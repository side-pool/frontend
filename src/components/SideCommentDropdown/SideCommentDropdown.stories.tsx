import React from 'react';

import { Story, Meta } from '@storybook/react';
import SideCommentDropdown from '@src/components/SideCommentDropdown';

export default {
  title: 'components/Side Comment Dropdown',
  component: SideCommentDropdown,
} as Meta;

const Template: Story = () => {
  return <SideCommentDropdown />;
};

export const sideCommentDropdown = Template.bind({});
