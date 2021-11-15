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
  const maxHashTagInfo = hashTagInfos.pop()!; // 최댓값 따로 추출

  // binning
  const weight = getWeight(hashTagInfos);
  const binLen = hashLength > 4 ? 4 : hashLength; // 구간 길이
  const binCnt = Math.floor(hashLength / binLen); // 구간 개수
  const binWidth = Math.floor(WIDTH / binLen); // 구간별 실제 너비

  let binNumber = -1;

  hashTagInfos.sort(() => 0.5 - Math.random()); // 셔플

  while (hashTagInfos.length !== 0) {
    // 하나의 구간
    binNumber += 1;
    const bin = [];

    for (let binIdx = 0; binIdx < binCnt; binIdx++) {
      const hashInfo = hashTagInfos.pop();
      hashInfo && bin.push(hashInfo);
    }

    // 값 지정
    const res = bin.map((hashTagInfo) => {
      return {
        weight,
        coordinate: {
          ...getRandCoordinate(
            HEIGHT,
            // 구간 별 x 좌표
            binNumber * binWidth,
            (binNumber + 1) * binWidth,
          ),
        },
        opacity: getRandOpacity(),
        ...hashTagInfo,
      };
    });

    circlePropsArr.push(...res);
  }

  circlePropsArr.push({
    weight,
    coordinate: {
      ...getRandCoordinate(
        HEIGHT,
        Math.floor(binCnt / 2) * binWidth, // 최댓값 중앙에 추가
        (Math.floor(binCnt / 2) + 1) * binWidth,
      ),
    },
    opacity: getRandOpacity(),
    ...maxHashTagInfo,
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
