import React, { useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';

import styles from './SideList.module.scss';
import { useReadSides } from '@src/hooks/useSideQuery';
import Spinner from '@src/components/common/Spinner';
import SideCard from '@src/components//SideCard';
import { useSideState } from '@src/store';
import useThrottle from '@src/hooks/useThrottle';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import Typography from '@src/components/common/Typography';

const BREAKPOINT_COLS = {
  default: 4,
  1800: 3,
  1500: 2,
  700: 1,
};

const SideList = () => {
  const target = useRef<HTMLDivElement | null>(null);
  const side = useSideState();

  const handleDeleteQueryKey = useCallback(() => {
    const sideCopy = { ...side };
    if (!sideCopy?.isRecruiting) {
      delete sideCopy?.isRecruiting;
    }

    if (sideCopy?.search?.length === 0) {
      delete sideCopy?.search;
    }

    return sideCopy;
  }, [side]);

  const {
    data: infiniteData,
    fetchNextPage,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    isFetchedAfterMount,
  } = useReadSides(handleDeleteQueryKey());

  const handleInfiniteFetch = useThrottle(() => {
    fetchNextPage();
  }, 100);

  useIntersectionObserver({
    target,
    onIntersect: (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (isFetchedAfterMount && entry.isIntersecting) {
          handleInfiniteFetch();
        }
      });
    },
  });

  return (
    <div className={styles.SideList}>
      {isSuccess &&
        (infiniteData?.pages[0].length === 0 ? (
          // 사이드가 없는 경우
          <Typography
            className={styles.sideTypography}
            fontSize="xl"
            textColor="lightGray"
          >
            아직 작성된 사이드가 없습니다.
          </Typography>
        ) : (
          <Masonry
            breakpointCols={BREAKPOINT_COLS}
            className={styles.grid}
            columnClassName={styles.gridColumn}
          >
            {infiniteData?.pages?.map((page) =>
              page.map((data) => <SideCard {...data} key={data.id} />),
            )}
          </Masonry>
        ))}
      <div className={styles.isLoading}>
        {(isFetchingNextPage || isLoading) && <Spinner />}
      </div>
      <div ref={target} className="last-item" />
    </div>
  );
};

export default SideList;
