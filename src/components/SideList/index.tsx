import React, { useRef, useState } from 'react';
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
  1100: 1,
};

const SideList = () => {
  const target = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const side = useSideState();

  const {
    data: infiniteData,
    fetchNextPage,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    isFetchedAfterMount,
  } = useReadSides({
    ...side,
    // TODO: undefined는 isRecruiting 프로퍼티 삭제를 위한 방법 => 좀 더 나은 방법을 생각해보기
    isRecruiting: side.isRecruiting ? true : undefined,
  });

  const handleInfiniteFetch = useThrottle(() => {
    fetchNextPage({ pageParam: page + 1 });
    setPage(page + 1);
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
      {!isLoading && (infiniteData?.pages || []).length === 0 && (
        <Typography
          className={styles.sideTypography}
          fontSize="md"
          textColor="lightGray"
        >
          아직 작성된 글이 없습니다.
        </Typography>
      )}
      <Masonry
        breakpointCols={BREAKPOINT_COLS}
        className={styles.grid}
        columnClassName={styles.gridColumn}
      >
        {isSuccess &&
          infiniteData?.pages?.map((page) =>
            page.map((data) => <SideCard {...data} key={data.id} />),
          )}
      </Masonry>
      {(isFetchingNextPage || isLoading) && <Spinner />}
      <div ref={target} className="last-item" />
    </div>
  );
};

export default SideList;
