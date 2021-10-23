import React from 'react';
import { Story, Meta } from '@storybook/react';
import Sidebar, { SidebarProps } from '@src/components/common/Sidebar';

export default {
  title: 'Common/Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story<SidebarProps> = (props) => <Sidebar {...props} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  pathname: 'side',
};

export const ColorIcon = () => <Sidebar pathname="sideidea" />;

export const MonoIcon = () => <Sidebar pathname="" />;
