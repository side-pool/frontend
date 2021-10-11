import React from 'react';
import { render, getByTestId } from '@src/utils/test-utils';

import Icon, { IconProps } from '@src/components/common/Icon';

const renderIcon = (props: IconProps) => {
  return render(<Icon {...props} />);
};

describe('<Icon />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderIcon({});
    expect(container).toBeInTheDocument();
  });

  context('props를 넘기는 상황에서', () => {
    it('iconName props를 넘기면 컴포넌트에 반영된다', () => {
      const iconName = 'favorite';

      const { container } = renderIcon({ iconName });

      expect(container).toHaveTextContent(iconName);
    });
    it('size props를 넘기면 컴포넌트에 반영된다', () => {
      const size = 50;

      const { container } = renderIcon({ size });

      expect(getByTestId(container, 'icon')).toHaveStyle(
        `font-size: ${size}px`,
      );
    });
    it('color props를 넘기면 컴포넌트에 반영된다', () => {
      const color = 'red';

      const { container } = renderIcon({ color });

      expect(getByTestId(container, 'icon')).toHaveStyle(`color: ${color}`);
    });
    it('pointer props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderIcon({ pointer: true });

      expect(getByTestId(container, 'icon')).toHaveClass('pointer');
    });
    it('bold props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderIcon({ bold: true });

      expect(getByTestId(container, 'icon')).toHaveClass('bold');
    });
  });
});
