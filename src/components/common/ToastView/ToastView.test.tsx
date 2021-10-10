import React from 'react';
import { render, screen, fireEvent, within } from '@src/test-utils';
import ToastView from '@src/components/common/ToastView';

describe('<ToastView /> 테스트', () => {
  let container: Element;
  beforeEach(() => {
    ({ container } = render(<ToastView message="toast" />));
  });

  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    expect(container).toBeInTheDocument();
  });

  it('toast 버튼을 한 번 클릭하면 toast item이 한 번 렌더링되어야 한다.', () => {
    const list = screen.getByRole('list', { name: /toasts/i });

    fireEvent.click(screen.getByRole('button', { name: 'toast-btn' }));
    const items = within(list).getAllByRole('listitem');

    expect(items.length).toBe(1);
  });

  it('toast 버튼을 다수 클릭하면 toast item이 횟수 만큼 렌더링되어야 한다.', () => {
    const list = screen.getByRole('list', { name: /toasts/i });
    const addCount = 20;

    Array(addCount)
      .fill(null)
      .map(() =>
        fireEvent.click(screen.getByRole('button', { name: 'toast-btn' })),
      );
    const items = within(list).getAllByRole('listitem');

    expect(items.length).toBe(addCount);
  });

  it('toast 버튼을 클릭하지 않으면 toast item은 존재하지 않는다.', () => {
    const list = screen.getByRole('list', { name: /toasts/i });

    expect(() => within(list).getByRole('listitem')).toThrow();
  });

  it('toast close 버튼을 누르면 해당되는 toast 가 삭제된다.', () => {
    const addCount = 20;
    const removeNum = 5;
    const list = screen.getByRole('list', { name: /toasts/i });

    Array(addCount)
      .fill(null)
      .map(() =>
        fireEvent.click(screen.getByRole('button', { name: 'toast-btn' })),
      );

    fireEvent.click(
      screen.getByRole('button', { name: `${removeNum}-toast-close-btn` }),
    );

    const items = within(list).getAllByRole('listitem');

    expect(items.length).toBe(addCount - 1);
    expect(() =>
      within(list).getByRole('listitem', { name: `${removeNum}-toast` }),
    ).toThrow();
  });
});
