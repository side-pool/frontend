import React from 'react';
import { Meta } from '@storybook/react';
import IdeaPage from '@src/pages/IdeaPage';

export default {
  title: 'Pages/IdeaPage',
  component: IdeaPage,
} as Meta;

export const View = () => <IdeaPage />;
