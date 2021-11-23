import { useRef } from 'react';

const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: T[]) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...args);
      timer.current = null;
    }, delay);
  };
};

export default useDebounce;
