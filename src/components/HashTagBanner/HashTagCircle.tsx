import React from 'react';
import styles from './HashTagCircle.module.scss';

const BLUE_ACTIVE = '#004ce5';
const DEFAULT_RADIUS = 15;
const MAX_RADIUS = 150;

const getRadius = (count: number, weight: number) => {
  const rad = count * weight * DEFAULT_RADIUS;
  if (rad > MAX_RADIUS) {
    return MAX_RADIUS;
  }
  if (rad < DEFAULT_RADIUS) {
    return DEFAULT_RADIUS;
  }
  return rad;
};

export interface HashTagCircleProps {
  count: number;
  weight?: number;
  opacity: number;
  word: string;
  coordinate?: {
    x: number;
    y: number;
  };
}

const HashTagCircle = ({
  count,
  weight = 1,
  opacity,
  word,
  coordinate,
}: HashTagCircleProps) => {
  return (
    <g fill={`${BLUE_ACTIVE}`} className={styles.HashTagCircle}>
      <circle
        cx={coordinate?.x ?? '50%'}
        cy={coordinate?.y ?? '50%'}
        r={`${getRadius(count, weight)}`}
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
