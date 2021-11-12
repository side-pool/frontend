import React from 'react';
import Masonry from 'react-masonry-css';

import styles from './MyIdeaList.module.scss';
import Spinner from '@src/components/common/Spinner';
import IdeaMiniCard from '@src/components/Idea/IdeaMiniCard';
import { useReadMyIdea } from '@src/hooks/useMyPageQuery';

const BREAKPOINT_COLS = {
  default: 4,
  1800: 3,
  1500: 2,
  1100: 1,
};

const MyIdeaList = () => {
  const { data, isLoading, isError } = useReadMyIdea();

  return (
    <div className={styles.MyIdeaList}>
      {isLoading && <Spinner />}
      <Masonry
        breakpointCols={BREAKPOINT_COLS}
        className={styles.grid}
        columnClassName={styles.gridColumn}
      >
        {!isError &&
          data?.map((each) => <IdeaMiniCard {...each} key={each.id} />)}
      </Masonry>
    </div>
  );
};

export default MyIdeaList;
