import React from 'react';
import { render, getByTestId, screen } from '@src/utils/test-utils';

import Textarea, { TextareaProps } from '@src/components/common/Textarea';

const renderTextarea = (props: TextareaProps) => {
  return render(<Textarea {...props} />);
};

describe('<Textarea />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderTextarea({});
    expect(container).toBeInTheDocument();
  });

  context('props를 넘기는 상황에서', () => {
    it('disabled props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderTextarea({ disabled: true });

      expect(getByTestId(container, 'textarea')).toHaveClass('disabled');
    });
    it('maxWidth props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderTextarea({ maxWidth: true });

      expect(getByTestId(container, 'textarea')).toHaveClass(
        'Textarea maxWidth',
      );
    });
    it('placeholder props를 넘기면 컴포넌트에 반영된다', () => {
      const placeholder = 'test';
      renderTextarea({ placeholder });

      expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
    });
  });
});
