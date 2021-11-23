import React, { useMemo } from 'react';
import styles from './MiddleArea.module.scss';

import Typography from '@src/components/common/Typography';

import OneWeek from '@src/assets/OneWeek.gif';
import OneMonth from '@src/assets/OneMonth.gif';
import SixMonth from '@src/assets/SixMonth.gif';
import Rest from '@src/assets/Rest.gif';

import { getActiveTime } from '@src/utils/common';

interface MiddleProps {
  title: string;
  active: string;
}

const MiddleArea = ({ title, active }: MiddleProps) => {
  const activeTime = useMemo(() => getActiveTime({ active }), [active]);
  return (
    <div className={styles.MiddleArea}>
      <Typography fontSize="md" fontWeight="medium" textColor="black">
        {title}
      </Typography>
      <img
        src={
          {
            oneWeek: OneWeek,
            oneMonth: OneMonth,
            sixMonth: SixMonth,
            rest: Rest,
          }[activeTime]
        }
        alt={activeTime}
        loading="lazy"
      />
    </div>
  );
};

export default MiddleArea;
