import React, { useRef, useState } from 'react';
import IdeaCard from '@src/components/Idea/IdeaCard';
import styles from './IdeaCardContainer.module.scss';
import { useReadIdeas } from '@src/hooks/useIdeaQuery';
import Spinner from '@src/components/common/Spinner';
import { useIdeaState } from '@src/store';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import useThrottle from '@src/hooks/useThrottle';

const IdeaCardContainer = () => {
  const target = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const idea = useIdeaState();
  const {
    data: infiniteData,
    fetchNextPage,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    isFetchedAfterMount,
    // TODO: undefined는 isDone 프로퍼티 삭제를 위한 방법 => 좀 더 나은 방법을 생각해보기
  } = useReadIdeas({ ...idea, isDone: idea.isDone ? true : undefined });

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
    <div className={styles.IdeaCardContainer}>
      {isSuccess &&
        infiniteData?.pages?.map((page) =>
          page.map((data) => <IdeaCard key={data.id} idea={data} />),
        )}
      {(isFetchingNextPage || isLoading) && <Spinner />}
      <div ref={target} className="last-item" />
    </div>
  );
};

export default IdeaCardContainer;
