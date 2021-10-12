import React from 'react';
import { Story, Meta } from '@storybook/react';
import Sidebar from '@src/components/common/Sidebar';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story = () => <Sidebar />;

export const sidebar = Template.bind({});
