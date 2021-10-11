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

export const text = Template.bind({});

text.args = {
  children: 'give me the text',
  fontSize: 'md',
  fontWeight: 'regular',
  textAlign: 'start',
};

const getHeader = (content: string) => {
  return (
    <header
      style={{
        color: '#1C7ED6',
        fontSize: '15px',
        padding: '15px 0px 5px 0px',
      }}
    >
      {content}
    </header>
  );
};

export const Variant = () => {
  return (
    <Fragment>
      {getHeader('타입/타이틀1')}
      <Text fontSize={'xxl'} fontWeight={'bold'} textColor="titleBlack">
        타이틀1
      </Text>
      {getHeader('타입/메뉴버튼')}
      <Text fontSize={'lg'} fontWeight={'bold'} textColor="black">
        메뉴버튼
      </Text>
      {getHeader('타입/텍스트')}
      <Text fontSize={'sm'} fontWeight={'medium'} textColor="black">
        답글달기
      </Text>
      {getHeader('타입/본문 타이틀')}
      <Text fontSize={'md'} fontWeight={'medium'} textColor="black">
        본문 타이틀
      </Text>
      {getHeader('타입/본문, 아이디')}
      <Text fontSize={'xs'} fontWeight={'regular'} textColor="black">
        본문/아이디
      </Text>
      {getHeader('타입/21시간 전')}
      <Text fontSize={'xxs'} fontWeight={'regular'} textColor="gray">
        21시간 전
      </Text>
    </Fragment>
  );
};
