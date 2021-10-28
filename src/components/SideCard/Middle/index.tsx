import Typography from '@src/components/common/Typography';
import React from 'react';
import styles from './Middle.module.scss';
import OneWeek from '@src/assets/OneWeek.gif';
import OneMonth from '@src/assets/OneMonth.gif';
import SixMonth from '@src/assets/SixMonth.gif';
import Rest from '@src/assets/Rest.gif';
import { getActiveTime } from '@src/utils/common';

interface MiddleProps {
  title: string;
  active: string;
}

const Middle = ({ title, active }: MiddleProps) => {
  return (
    <div className={styles.Middle}>
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
          }[getActiveTime({ active })]
        }
        alt={title}
      />
    </div>
  );
};

export default Middle;
