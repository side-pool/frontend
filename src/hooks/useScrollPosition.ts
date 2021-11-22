import { useState, useEffect } from 'react';
import useThrottle from './useThrottle';

const useScrollPosition = (): { isActive: boolean } => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });

  const [isActive, setIsActive] = useState(true);

  const handleScroll = useThrottle(() => {
    setData((last) => {
      return {
        x: window.scrollX,
        y: window.scrollY,
        lastX: last.x,
        lastY: last.y,
      };
    });
  }, 200);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', () => handleScroll());

    return () => {
      window.removeEventListener('scroll', () => handleScroll());
    };
  }, []);

  useEffect(() => {
    let flag = false;
    if (data.y > 150 && data.y - data.lastY > 0) flag = true;

    setIsActive(flag);
  }, [data.y, data.lastY]);

  return { isActive };
};

export default useScrollPosition;
