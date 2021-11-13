import React from 'react';
import HashTagCircle from './HashTagCircle';
import styles from './HashTagBanner.module.scss';
import { HashTagInfo } from '@src/models';

const WIDTH = 1021;
const HEIGHT = 180;

export interface HashTagBannerProps {
  hashTagInfos: HashTagInfo[];
}

// 주어진 캔버스에서 랜덤한 원 중점의 좌표
const getRandCoordinate = (width: number, height: number) => {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return {
    x,
    y,
  };
};

// 0.6, 0.7, 0.8, 0.9, 1
const getRandOpacity = () => (Math.floor(Math.random() * 5) + 1 + 5) / 10;

const HashTagBanner = ({ hashTagInfos, ...props }: HashTagBannerProps) => {
  return (
    <svg
      className={styles.HashTagBanner}
      width={String(WIDTH)}
      height={String(HEIGHT)}
      {...props}
    >
      {hashTagInfos.map((hashTagInfo) => (
        <HashTagCircle
          key={hashTagInfo.word}
          coordinate={{ ...getRandCoordinate(WIDTH, HEIGHT) }}
          opacity={getRandOpacity()}
          {...hashTagInfo}
        />
      ))}
    </svg>
  );
};

export default HashTagBanner;
