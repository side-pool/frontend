import React from 'react';
import Masonry from 'react-masonry-css';

import styles from './MyIdeaList.module.scss';
import Spinner from '@src/components/common/Spinner';
import IdeaMiniCardContainer from '@src/components/Idea/IdeaMiniCardContainer';
import { useReadMyIdea } from '@src/hooks/useMyPageQuery';
import Typography from '@src/components/common/Typography';

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
      {(data || []).length > 0 ? (
        <Masonry
          breakpointCols={BREAKPOINT_COLS}
          className={styles.grid}
          columnClassName={styles.gridColumn}
        >
          {!isError &&
            data?.map((each) => (
              <IdeaMiniCardContainer {...each} key={each.id} />
            ))}
        </Masonry>
      ) : (
        <Typography
          className={styles.myIdeaTypography}
          fontSize="md"
          textColor="lightGray"
        >
          아직 작성된 글이 없습니다.
        </Typography>
      )}
    </div>
  );
};

export default MyIdeaList;
