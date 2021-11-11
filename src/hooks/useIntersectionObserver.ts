import { RefObject, useEffect } from 'react';

interface IntersectionProps {
  root?: Element | null;
  target: RefObject<Element>;
  onIntersect: (entries: IntersectionObserverEntry[]) => void;
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '200px 0px',
}: IntersectionProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    if (!target?.current) {
      return;
    }
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};

export default useIntersectionObserver;
