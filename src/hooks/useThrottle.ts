import { useRef } from 'react';

const useThrottle = <T>(callback: (...args: T[]) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: T[]) => {
    if (timer.current) return;

    timer.current = setTimeout(() => {
      timer.current = null;
    }, delay);

    callback(...args);
  };
};

export default useThrottle;
