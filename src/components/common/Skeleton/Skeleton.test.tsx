import React from 'react';
import { render, getByTestId } from '@src/utils/test-utils';
import Skeleton, { SkeletonProps } from '@src/components/common/Skeleton';

const testQuote = `"I find the harder I work, the more luck I have" - Thomas Jefferson`;

const renderInput = (props: SkeletonProps) => {
  return render(<Skeleton {...props} />);
};

describe('<Skeleton />', () => {
  it('컴포넌트는 정상적으로 렌더링되어야 한다.', () => {
    const { container } = renderInput({});
    expect(container).toBeInTheDocument();
    expect(getByTestId(container, 'skeleton')).toHaveClass('_SKELETON_');
  });

  context('props를 넘기는 상황에서', () => {
    it('variant props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ variant: 'rect' });
      expect(getByTestId(container, 'skeleton')).toHaveClass('rect');
    });
    it('animation props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ animation: 'wave' });
      expect(getByTestId(container, 'skeleton')).toHaveClass('wave');
    });
    it('size props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ size: 'md' });
      expect(getByTestId(container, 'skeleton')).toHaveClass('md');
    });
    it('maxWidth props를 넘기면 컴포넌트에 반영된다', () => {
      const { container } = renderInput({ maxWidth: true });
      expect(getByTestId(container, 'skeleton')).toHaveClass('max-width');
    });
    context('children props를 넘기면', () => {
      it('withChildren이 true일 때 컴포넌트에 반영된다', () => {
        const { container } = renderInput({
          withChildren: true,
          children: testQuote,
        });
        expect(getByTestId(container, 'skeleton')).toHaveTextContent(testQuote);
      });
      it('withChildren이 false일 때 컴포넌트에 반영되지 않는다', () => {
        const { container } = renderInput({
          withChildren: false,
          children: testQuote,
        });
        expect(getByTestId(container, 'skeleton')).toEqual(
          expect.not.stringContaining(testQuote),
        );
      });
    });
  });
});
