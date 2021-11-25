import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import OneWeek from '@src/assets/OneWeek.json';
import OneMonth from '@src/assets/OneMonth.json';
import SixMonth from '@src/assets/SixMonth.json';
import Rest from '@src/assets/Rest.json';

export interface LottieProps {
  activeTime: 'oneWeek' | 'oneMonth' | 'sixMonth' | 'rest';
}

const Lottie = ({ activeTime }: LottieProps) => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (element.current) {
      lottie.loadAnimation({
        animationData: {
          oneWeek: OneWeek,
          oneMonth: OneMonth,
          sixMonth: SixMonth,
          rest: Rest,
        }[activeTime || 'rest'],
        container: element.current,
        loop: true,
      });
    }
  }, [element]);

  return (
    <div className="Lottie" ref={element} style={{ width: 74, height: 74 }} />
  );
};

export default Lottie;
