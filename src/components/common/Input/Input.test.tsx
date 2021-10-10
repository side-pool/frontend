import React from 'react';
import { render, getByTestId, screen } from '@src/test-utils';

import Input, { InputProps } from '@src/components/common/Input';

const renderInput = (props: InputProps) => {
  return render(<Input {...props} />);
};

describe('<Input />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderInput({});
    expect(container).toBeInTheDocument();
  });

  context('props를 넘기는 상황에서', () => {
    it('password props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ password: true });

      expect(getByTestId(container, 'input')).toHaveTextContent('visibility');
    });
    it('disabled props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ disabled: true });

      expect(getByTestId(container, 'input')).toHaveClass('disabled');
    });
    it('error props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ error: true });

      expect(getByTestId(container, 'input')).toHaveClass('error');
    });
    it('errorMessage props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({
        error: true,
        errorMessage: '에러발생!',
      });

      expect(getByTestId(container, 'input')).toHaveTextContent('에러발생!');
    });
    it('maxWidth props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ maxWidth: true });

      expect(getByTestId(container, 'input')).toHaveClass('Input maxWidth');
    });
    it('placeholder props를 넘기면 컴포넌트에 반영된다', () => {
      const placeholder = 'test';
      renderInput({ placeholder });

      expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });
  });
});
