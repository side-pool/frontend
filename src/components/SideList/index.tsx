import React from 'react';
import Masonry from 'react-masonry-css';

import styles from './SideList.module.scss';
import { useReadSides, useReadMySides } from '@src/hooks/useSideQuery';
import Spinner from '@src/components/common/Spinner';
import SideCard from '@src/components//SideCard';
import { useSideState } from '@src/store';

const BREAKPOINT_COLS = {
  default: 4,
  1800: 3,
  1500: 2,
  1100: 1,
};

interface SideListProps {
  isMyPage?: boolean;
}

const SideList = ({ isMyPage = false }: SideListProps) => {
  const side = useSideState();
  const { data, isLoading, isError } = isMyPage
    ? useReadMySides()
    : useReadSides(side);

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
