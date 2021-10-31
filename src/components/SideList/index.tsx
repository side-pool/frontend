import React from 'react';
import Masonry from 'react-masonry-css';

import styles from './SideList.module.scss';
import { useReadSides } from '@src/hooks/useSideQuery';
import Spinner from '@src/components/common/Spinner';
import SideCard from '@src/components//SideCard';

const BREAKPOINT_COLS = {
  default: 4,
  1500: 3,
  1200: 2,
  800: 1,
};

const SideList = () => {
  const { data, isLoading, isError } = useReadSides();

  return (
    <div className={styles.SideList}>
      {isLoading && <Spinner />}
      <Masonry
        breakpointCols={BREAKPOINT_COLS}
        className={styles.grid}
        columnClassName={styles.gridColumn}
      >
        {!isError && data?.map((each) => <SideCard {...each} key={each.id} />)}
      </Masonry>
    </div>
  );
};

export default SideList;
