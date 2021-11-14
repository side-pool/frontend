import React from 'react';

import { Story, Meta } from '@storybook/react';
import DropdownOnlyLists, {
  DropdownOnlyListsProps,
} from '@src/components/SideCommentDropdown/DropdownOnlyLists';
import { COMMENT_DROPDOWN } from '@src/components/SideCommentDropdown';

export default {
  title: 'components/Dropdown Only Lists',
  component: DropdownOnlyLists,
} as Meta;

const Template: Story<DropdownOnlyListsProps> = () => {
  return <DropdownOnlyLists dropdwonLists={COMMENT_DROPDOWN} />;
};

export const dropdownOnlyLists = Template.bind({});
