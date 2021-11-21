import React, { useMemo } from 'react';
import HashTagCircle, { HashTagCircleProps } from './HashTagCircle';
import styles from './HashTagBanner.module.scss';
import { HashTagInfo } from '@src/models';

const WIDTH = 1020;
const HEIGHT = 180;

const OPACITIES = [0.3, 0.7, 0.9];

const divide = function <T>(arr: T[], secCnt: number) {
  const sections: T[][] = [];

  while (arr.length !== 0) {
    const section: T[] = [];

    for (let idx = 0; idx < secCnt; idx++) {
      const hashInfo = arr.pop();
      hashInfo && section.push(hashInfo);
    }

    sections.push(section);
  }

  return sections;
};

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

  const weight = getWeight(hashTagInfos);
  const secLen = hashLength > 4 ? 4 : hashLength; // 구간 길이
  const secCnt = Math.floor(hashLength / secLen); // 구간 개수
  const secWidth = Math.floor(WIDTH / secLen); // 구간별 실제 너비

  hashTagInfos.sort(() => 0.5 - Math.random()); // 셔플

  const dividedInfos = divide(hashTagInfos, secCnt);

  dividedInfos.forEach((hashSec, secIdx) => {
    const res = hashSec.map((hashTagInfo) => {
      return {
        weight,
        coordinate: {
          ...getRandCoordinate(
            HEIGHT,
            // 구간 별 x 좌표
            secIdx * secWidth,
            (secIdx + 1) * secWidth,
          ),
        },
        opacity: getRandOpacity(),
        ...hashTagInfo,
      };
    });

    circlePropsArr.push(...res);
  });

  circlePropsArr.push({
    weight,
    coordinate: {
      ...getRandCoordinate(
        HEIGHT,
        Math.floor(secLen / 2) * secWidth, // 최댓값 중앙에 추가
        (Math.floor(secLen / 2) + 1) * secWidth,
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
