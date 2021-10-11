import React from 'react';
import { render, getByTestId } from '@src/utils/test-utils';

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

    it('variant props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ variant: 'normal' });

      expect(getByTestId(container, 'button')).toHaveClass('normal');
    });
    it('primary props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ primary: true });

      expect(getByTestId(container, 'button')).toHaveClass('primary');
    });
    it('disabled props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ disabled: true });

      expect(getByTestId(container, 'button')).toHaveClass('disabled');
    });
    it('fullWidth props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderButton({ fullWidth: true });

      expect(getByTestId(container, 'button')).toHaveClass('fullWidth');
    });
    it('disabled props를 넘기면 컴포넌트에 반영된다', () => {
      const labelText = 'hooker';

      const { container } = renderButton({ labelText });

      expect(container).toHaveTextContent(labelText);
    });
  });
});
