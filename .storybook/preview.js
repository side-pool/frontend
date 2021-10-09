import React from 'react';
import { addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import store from '@src/store';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((Story) => (
  <Provider store={store}>
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  </Provider>
));
