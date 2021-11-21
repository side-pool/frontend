import React from 'react';
import { Story, Meta } from '@storybook/react';
import MobileSidebar, {
  MobileSidebarProps,
} from '@src/components/mobile/MobileSidebar';

export default {
  title: 'Common/MobileSidebar',
  component: MobileSidebar,
} as Meta;

const Template: Story<MobileSidebarProps> = (props) => (
  <MobileSidebar {...props} />
);

export const Default = Template.bind({});

Default.args = {
  className: '',
  pathname: 'side',
};

export const ColorIcon = () => <MobileSidebar pathname="sideidea" />;

export const MonoIcon = () => <MobileSidebar pathname="" />;
