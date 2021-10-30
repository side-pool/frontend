import React from 'react';
import IdeaCard from '@src/components/Idea/IdeaCard';
import styles from './IdeaCardContainer.module.scss';
import { useReadIdeas } from '@src/hooks/useIdeaQuery';
import Spinner from '@src/components/common/Spinner';

const IdeaCardContainer = () => {
  const { data: dataArr, isSuccess, isLoading } = useReadIdeas();

  return (
    <div className={styles.IdeaCardContainer}>
      {isLoading && <Spinner />}
      {isSuccess &&
        dataArr?.map((data) => <IdeaCard key={data.id} idea={data} />)}
    </div>
  );
};

export default IdeaCardContainer;
