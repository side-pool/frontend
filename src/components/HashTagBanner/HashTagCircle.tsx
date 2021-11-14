import React from 'react';
import styles from './HashTagCircle.module.scss';

const BLUE_ACTIVE = '#004ce5';
const DEFAULT_RAD = 15;

export interface HashTagCircleProps {
  count: number;
  opacity: number;
  word: string;
  coordinate?: {
    x: number;
    y: number;
  };
}

const HashTagCircle = ({
  count,
  opacity,
  word,
  coordinate,
}: HashTagCircleProps) => {
  return (
    <g fill={`${BLUE_ACTIVE}`} className={styles.HashTagCircle}>
      <circle
        cx={coordinate?.x ?? '50%'}
        cy={coordinate?.y ?? '50%'}
        r={`${count + DEFAULT_RAD}`}
        opacity={`${opacity}`}
      />
      <text
        x={coordinate?.x ?? '50%'}
        y={coordinate?.y ?? '50%'}
        textAnchor="middle"
        className={styles.word}
      >
        {word}
      </text>
    </g>
  );
};

export default HashTagCircle;
