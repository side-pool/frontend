import React, { useMemo } from 'react';
import HashTagCircle, { HashTagCircleProps } from './HashTagCircle';
import styles from './HashTagBanner.module.scss';
import { HashTagInfo } from '@src/models';

const WIDTH = 1020;
const HEIGHT = 180;

const OPACITIES = [0.8, 0.9, 1];

// 주어진 캔버스에서 랜덤한 원 중점의 좌표
const getRandCoordinate = (height: number, minX: number, maxX: number) => {
  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * height;
  return {
    x,
    y,
  };
};

const getRandOpacity = () => OPACITIES[Math.floor(Math.random() * 3)];

const getWeight = (hashTagInfos: HashTagInfo[]) =>
  hashTagInfos.reduce((acc, hashTagInfo) => {
    acc += hashTagInfo.count;
    return acc;
  }, 0) / hashTagInfos.length;

// TODO: 코드 정리하기
const getCirclePropsArr = (
  hashTagInfos: HashTagInfo[],
): HashTagCircleProps[] => {
  const circlePropsArr: HashTagCircleProps[] = [];

  const hashLength = hashTagInfos.length;
  if (hashLength === 0) {
    return circlePropsArr;
  }

  const weight = getWeight(hashTagInfos);
  const binMaxIdx = hashLength > 4 ? 4 : hashLength; // 구간 index 개수
  const binIdxLength = Math.floor(hashLength / binMaxIdx); // 구간 index 길이
  const binWidth = Math.floor(WIDTH / binMaxIdx); // 구간 너비

  // 좌표 구간을 나누는 작업
  for (let binIdx = 0; binIdx < binMaxIdx; binIdx++) {
    const targets = [];

    // 구간 index 길이 만큼 pop
    for (let curIdx = 0; curIdx < binIdxLength; curIdx++) {
      const target = hashTagInfos.pop();
      target && targets.push(target);
    }

    const newInfo = targets.map((targetInfo) => {
      return {
        weight,
        coordinate: {
          ...getRandCoordinate(
            HEIGHT,
            binIdx * binWidth,
            (binIdx + 1) * binWidth,
          ),
        },
        opacity: getRandOpacity(),
        ...targetInfo,
      };
    });

    circlePropsArr.push(...newInfo);
  }

  // 남은 애들을 중앙에 배치시킨다.
  hashTagInfos.forEach((hashTagInfo) => {
    circlePropsArr.push({
      weight,
      coordinate: {
        ...getRandCoordinate(
          HEIGHT,
          Math.floor(binIdxLength / 2) * binWidth,
          (Math.floor(binIdxLength / 2) + 1) * binWidth,
        ),
      },
      opacity: getRandOpacity(),
      ...hashTagInfo,
    });
  });

  return circlePropsArr;
};

export interface HashTagBannerProps {
  hashTagInfos: HashTagInfo[];
}

const HashTagBanner = ({ hashTagInfos, ...props }: HashTagBannerProps) => {
  const circlePropsArr = useMemo(
    () => getCirclePropsArr([...hashTagInfos]),
    hashTagInfos,
  );

  return (
    <div className={styles.HashTagBanner}>
      <svg
        className={styles.banner}
        width={String(WIDTH)}
        height={String(HEIGHT)}
        {...props}
      >
        {circlePropsArr.map((circleProps) => (
          <HashTagCircle
            key={circleProps.word} // 해시태그 word는 중복 x
            {...circleProps}
          />
        ))}
      </svg>
    </div>
  );
};

export default HashTagBanner;
