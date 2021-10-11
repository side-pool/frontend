// code reference: https://redux.js.org/usage/writing-tests#components
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

// Import your own modules
import store from '@src/store';

const render = (component: React.ReactElement) => {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(component, { wrapper: Wrapper });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
