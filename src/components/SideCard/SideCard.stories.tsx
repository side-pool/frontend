import React from 'react';
import { Story, Meta } from '@storybook/react';

import SideCard, { SideCardProps } from '@src/components/SideCard';

export default {
  title: 'Components/Side Card',
  component: SideCard,
} as Meta;

const Template: Story<SideCardProps> = (props) => (
  <>
    <SideCard {...props} />
    <SideCard {...props} />
    <SideCard {...props} />
  </>
);

export const sideCard = Template.bind({});

sideCard.args = {
  active: '2021-10-17T01:18:23',
  category: ['WEB', 'APP', 'AI'],
  createdDate: '2021-10-16T01:18:23',
  favoriteCount: 0,
  id: 1,
  logoUrl: 'https://avatars.githubusercontent.com/u/54823396?v=4',
  recruiting: true,
  summary: '작은 사이드 프로젝트에서 시작하는 ~~~',
  title: '사이드 풀',
  updatedDate: '2021-10-17T01:18:23',
};

export const Variant = () => {
  return (
    <>
      <SideCard
        active="2021-10-29T01:18:23"
        category={['AI', 'WEB', 'APP', 'AI', 'WEB', 'APP', 'AI', 'WEB', 'APP']}
        recruiting
        summary="작은 사이드 프로젝트에서 시작하는 ~~~"
        title="작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~"
      />
      <br />
      <SideCard
        active="2021-07-17T01:18:23"
        category={['AI', 'WEB', 'APP', 'AI', 'WEB', 'APP', 'AI', 'WEB', 'APP']}
        summary="작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~"
        title="작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~"
      />
      <br />
      <SideCard
        active="2021-01-17T01:18:23"
        category={['']}
        logoUrl="https://avatars.githubusercontent.com/u/54823396?v=4"
        summary="작은 사이드 프로젝트에서 시작하는 ~~~"
        title="작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~"
      />
    </>
  );
};
