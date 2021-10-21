import React from 'react';
import { Story, Meta } from '@storybook/react';
import HashtagInput, { HashtagInputProps } from '@src/components/HashtagInput';

export default {
  title: 'components/HashtagInput',
  component: HashtagInput,
} as Meta;

const Template: Story<HashtagInputProps> = (props) => (
  <HashtagInput {...props} />
);

export const hashtagInput = Template.bind({});

hashtagInput.args = {
  className: '',
};
