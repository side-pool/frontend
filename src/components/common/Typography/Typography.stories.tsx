import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';
import Typography, { TypographyProps } from '@src/components/common/Typography';

export default {
  title: 'Common/Typography',
  component: Typography,
  argTypes: {
    fontSize: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<TypographyProps> = (props) => <Typography {...props} />;

export const Default = Template.bind({});

Default.args = {
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
      <Typography fontSize="xxl" fontWeight="bold" textColor="titleBlack">
        타이틀1
      </Typography>
      {getHeader('타입/메뉴버튼')}
      <Typography fontSize="lg" fontWeight="bold" textColor="black">
        메뉴버튼
      </Typography>
      {getHeader('타입/텍스트')}
      <Typography fontSize="sm" fontWeight="medium" textColor="black">
        답글달기
      </Typography>
      {getHeader('타입/본문 타이틀')}
      <Typography fontSize="md" fontWeight="medium" textColor="black">
        본문 타이틀
      </Typography>
      {getHeader('타입/본문, 아이디')}
      <Typography fontSize="xs" fontWeight="regular" textColor="black">
        본문/아이디
      </Typography>
      {getHeader('타입/21시간 전')}
      <Typography fontSize="xxs" fontWeight="regular" textColor="gray">
        21시간 전
      </Typography>
    </Fragment>
  );
};
