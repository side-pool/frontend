import React from 'react';
import { Story, Meta } from '@storybook/react';
import Masonry from 'react-masonry-css';

import SideList from '@src/components/SideList';

import styles from './SideList.module.scss';
import SideCard from '@src/components//SideCard';

export default {
  title: 'Components/Side List',
  component: SideList,
} as Meta;

const BREAKPOINT_COLS = {
  default: 4,
  1500: 3,
  1200: 2,
  800: 1,
};

const DATA = [
  {
    active: '2021-07-17T01:18:23',
    category: ['WEB', 'APP', 'AI'],
    createdDate: '2021-10-16T01:18:23',
    favoriteCount: 0,
    id: 1,
    logoUrl: 'https://avatars.githubusercontent.com/u/54823396?v=4',
    recruiting: true,
    summary: '작은 사이드 프로젝트에서 시작하는 ~~~',
    title: '사이드 풀',
    updatedDate: '2021-10-17T01:18:23',
  },
  {
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
  },
  {
    active: '2021-01-17T01:18:23',
    category: ['WEB', 'APP', 'AI'],
    createdDate: '2021-10-16T01:18:23',
    favoriteCount: 0,
    id: 1,
    logoUrl: 'https://avatars.githubusercontent.com/u/54823396?v=4',
    recruiting: true,
    summary: '작은 사이드 프로젝트에서 시작하는 ~~~',
    title: '사이드 풀',
    updatedDate: '2021-10-17T01:18:23',
  },
  {
    active: '2021-10-17T01:18:23',
    category: ['WEB', 'APP', 'AI'],
    createdDate: '2021-10-16T01:18:23',
    favoriteCount: 0,
    id: 1,
    recruiting: true,
    summary: '작은 사이드 프로젝트에서 시작하는 ~~~',
    title: '사이드 풀',
    updatedDate: '2021-10-17T01:18:23',
  },
  {
    active: '2020-10-17T01:18:23',
    category: ['WEB', 'APP', 'AI'],
    createdDate: '2021-10-16T01:18:23',
    favoriteCount: 0,
    id: 1,
    logoUrl: 'https://avatars.githubusercontent.com/u/54823396?v=4',
    recruiting: true,
    summary: '작은 사이드 프로젝트에서 시작하는 ~~~',
    title: '사이드 풀',
    updatedDate: '2021-10-17T01:18:23',
  },
  {
    active: '2021-10-31T01:18:23',
    category: ['WEB', 'APP', 'AI'],
    createdDate: '2021-10-16T01:18:23',
    favoriteCount: 0,
    id: 1,
    logoUrl: 'https://avatars.githubusercontent.com/u/54823396?v=4',
    recruiting: true,
    summary: '작은 사이드 프로젝트에서 시작하는 ~~~',
    title: '사이드 풀',
    updatedDate: '2021-10-17T01:18:23',
  },
];

const Template: Story = () => (
  <div className={styles.SideList}>
    <Masonry
      breakpointCols={BREAKPOINT_COLS}
      className={styles.grid}
      columnClassName={styles.gridColumn}
    >
      {[...DATA, ...DATA].map((each) => (
        <SideCard {...each} key={each.id} />
      ))}
    </Masonry>
  </div>
);

export const sideList = Template.bind({});
