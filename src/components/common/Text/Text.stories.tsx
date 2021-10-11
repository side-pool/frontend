import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';
import Text, { TextProps } from '@src/components/common/Text';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    fontSize: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<TextProps> = (props) => <Text {...props} />;
const emptyContent = ``;

export const text = Template.bind({});

text.args = {
  children: emptyContent,
  fontSize: 'md',
  fontWeight: 'regular',
  textAlign: 'start',
};

export const ExampleText = (props: TextProps) => (
  <Fragment>
    <Text fontSize={'sm'} {...props}>
      &quot;But man is not made for defeat,” he said. “A man can be destroyed
      but not defeated.&quot;
    </Text>
  </Fragment>
);
