import React from 'react';
import { render } from '@src/test-utils';

import App from './App';

describe('<App/> 테스트', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });
});
