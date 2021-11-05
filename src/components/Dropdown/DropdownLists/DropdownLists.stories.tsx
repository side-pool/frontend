import React from 'react';

import { Story, Meta } from '@storybook/react';
import DropdownLists, {
  DropdownListsProps,
} from '@src/components/Dropdown/DropdownLists';

export default {
  title: 'components/DropdownLists',
  component: DropdownLists,
} as Meta;

const Template: Story<DropdownListsProps> = () => {
  return (
    <DropdownLists
      dropdwonLists={[
        {
          name: '어쩌구',
          id: '1',
          checked: false,
        },
        {
          name: '저쩌구저쩌구저쩌구저쩌구저쩌구',
          id: '1',
          checked: false,
        },
      ]}
    />
  );
};

export const dropdownLists = Template.bind({});

export const None: Story<DropdownListsProps> = () => {
  return <DropdownLists dropdwonLists={[]} />;
};
