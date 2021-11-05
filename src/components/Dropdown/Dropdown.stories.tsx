import React from 'react';

import { Story, Meta } from '@storybook/react';
import Dropdown, { DropdownProps } from '@src/components/Dropdown';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
} as Meta;

const Template: Story<DropdownProps> = () => {
  return <Dropdown lists={['abc', 'cde']} title="category" />;
};

export const dropdown = Template.bind({});
