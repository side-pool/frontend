import React from 'react';
import { Story, Meta } from '@storybook/react';

import IdeaCard, { IdeaCardProps } from '@src/components/IdeaCard';

export default {
  title: 'Components/IdeaCard',
  component: IdeaCard,
} as Meta;

const Template: Story<IdeaCardProps> = (props) => <IdeaCard {...props} />;
export const ideaCard = Template.bind({});

const ideaMock = {
  id: 1,
  title: '제목을 입력해주세요.',
  content:
    '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한사람 대한으로 길이 보전하세 남산 위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세 무궁화 삼천리 화려 강산 대한사람 대한으로 길이 보전하세 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세 무궁화 삼천리 화려 강산 대한사람 대한으로 길이 보전하세 이 기상과 이 마음으로 충성을 다하여 괴로우나 즐거우나 나라사랑하세 무궁화 삼천리 화려 강산 대한사람 대한으로 길이 보전하세 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한사람 대한으로 길이 보전하세 ...',
  author: {
    id: 15680,
    nickname: '주예지',
    level: 5,
  },
  createdDate: '2021-10-06T20:21:39',
  updatedDate: '2021-10-06T21:21:39',
  isFavorite: false,
  favoriteCount: 23,
  isDone: false,
  hashtags: ['해시태그', '해시태그1234', '해시'],
};

ideaCard.args = { idea: { ...ideaMock } };
