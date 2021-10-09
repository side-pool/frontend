import React from 'react';
import { render, getByTestId } from '@src/test-utils';

import Button, { ButtonProps } from '@src/components/common/Button';

const renderButton = (props: ButtonProps) => {
  return render(<Button {...props} />);
};

describe('<Button />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderButton({});
    expect(container).toBeInTheDocument();
  });

  context('props를 넘기는 상황에서', () => {
    it('className props를 넘기면 컴포넌트에 반영된다', () => {
      const className = 'amugeona';

      const { container } = renderButton({ className });

      expect(getByTestId(container, 'button')).toHaveClass(className);
    });
    it('size props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ size: 'lg' });

      expect(getByTestId(container, 'button')).toHaveClass('lg');
    });
    it('variant props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ variant: 'solid' });

      expect(getByTestId(container, 'button')).toHaveClass('solid');
    });
    it('disabled props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ disabled: true });

      expect(getByTestId(container, 'button')).toHaveClass('disabled');
    });
    it('fullWidth props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ fullWidth: true });

      expect(getByTestId(container, 'button')).toHaveClass('full-width');
    });
    it('rounded props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ rounded: true });

      expect(getByTestId(container, 'button')).toHaveClass('rounded');
    });
    it('shadow props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ shadow: true });

      expect(getByTestId(container, 'button')).toHaveClass('shadow');
    });
    it('buttonColor props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ buttonColor: 'gray' });

      expect(getByTestId(container, 'button')).toHaveClass('gray');
    });
    it('disabled props를 넘기면 컴포넌트에 반영된다', () => {
      const labelText = 'hooker';

      const { container } = renderButton({ labelText });

      expect(container).toHaveTextContent(labelText);
    });
  });
});
