import React from 'react';
import { Story } from '@storybook/react';
import Icon, { IconProps } from '@src/components/common/Icon';

export default {
  title: 'Icon',
  component: Icon,
};

const Template: Story<IconProps> = (props: IconProps) => (
  <>
    {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
    <Icon {...props} />
    <div>
      <a target="_blank" href="https://fonts.google.com/icons" rel="noreferrer">
        Icon Set
      </a>
    </div>
  </>
);

export const icon = Template.bind({});

icon.args = {
  iconName: 'search',
  size: 24,
  color: 'gray',
  pointer: false,
};
