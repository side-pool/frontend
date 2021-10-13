import React from 'react';
import { Meta } from '@storybook/react';
import App from '@src/App';

export default {
  title: 'Pages/App',
  component: App,
} as Meta;

export const EmptyCard = () => <App />;
