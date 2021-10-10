import React from 'react';
import { render, getByTestId } from '@src/test-utils';
import Spinner, { SpinnerProps } from '@src/components/common/Spinner';

const renderSpinner = (props: SpinnerProps) => {
  return render(<Spinner {...props} />);
};

describe('<Spinner />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderSpinner({});
    expect(container).toBeInTheDocument();
  });

  context('props를 넘기는 상황에서', () => {
    it('size props를 넘기면 컴포넌트에 반영된다', () => {
      const size = 'md';
      const { container } = renderSpinner({ size });
      expect(getByTestId(container, 'spinner')).toHaveClass('md');
    });
  });
});
