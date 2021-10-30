import React from 'react';
import { Meta } from '@storybook/react';
import SidePage from '@src/pages/SidePage';

export default {
  title: 'Pages/SidePage',
  component: SidePage,
} as Meta;

export const View = () => <SidePage />;
