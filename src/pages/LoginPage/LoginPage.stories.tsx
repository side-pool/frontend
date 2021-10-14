import React from 'react';
import { Meta } from '@storybook/react';
import LoginPage from '@src/pages/LoginPage';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as Meta;

export const View = () => <LoginPage />;
