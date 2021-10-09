import React from 'react';
import { render, screen } from '@src/test-utils';
import Text, { TextProps } from '@src/components/common/Text';

const renderText = (props: TextProps) => {
  return render(<Text {...props} />);
};

describe('<Text />', () => {
  const testContent = `"But man is not made for defeat,” he said. “A man can be destroyed but not defeated."`;

  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = render(<Text />);
    expect(container).toBeInTheDocument();
  });

  it('children 으로 넘겨주는 텍스트를 렌더링해야 한다.', () => {
    renderText({ children: testContent });
    const text = screen.getByText(testContent);

    expect(text).toBeInTheDocument();
  });

  it('className props를 넘기면 컴포넌트에 반영되어야 한다', () => {
    const className = 'test-class';

    renderText({ className, children: testContent });
    const text = screen.getByText(testContent);

    expect(text).toHaveClass(className);
  });
});
