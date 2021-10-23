import React from 'react';
import { render } from '@src/utils/test-utils';
import Sidebar, { SidebarProps } from '@src/components/common/Sidebar';

const renderSidebar = (props: SidebarProps) => {
  return render(<Sidebar {...props} />);
};

describe('<Spinner />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderSidebar({ pathname: '' });
    expect(container).toBeInTheDocument();
  });
});
