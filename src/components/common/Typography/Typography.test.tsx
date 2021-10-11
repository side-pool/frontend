import React from 'react';
import { render, screen } from '@src/test-utils';
import Typography, { TypographyProps } from '@src/components/common/Typography';

const renderTypography = (props: TypographyProps) => {
  return render(<Typography {...props} />);
};

describe('<Typography />', () => {
  const testContent = `"But man is not made for defeat,” he said. “A man can be destroyed but not defeated."`;

  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = render(<Typography />);
    expect(container).toBeInTheDocument();
  });

  it('children 으로 넘겨주는 텍스트를 렌더링해야 한다.', () => {
    renderTypography({ children: testContent });
    const Typography = screen.getByText(testContent);

    expect(Typography).toBeInTheDocument();
  });
});
