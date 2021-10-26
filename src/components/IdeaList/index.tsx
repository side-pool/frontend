import React from 'react';
import IdeaCard from '@src/components/IdeaCard';
import styles from './IdeaList.module.scss';
import { useReadIdeas } from '@src/hooks/useIdeaQuery';
import Spinner from '../common/Spinner';

const IdeaList = () => {
  const readIdeaResult = useReadIdeas();
  console.log(readIdeaResult.data);

  return (
    <div className={styles.IdeaList}>
      {readIdeaResult.isLoading && <Spinner />}
      {!readIdeaResult.isError &&
        readIdeaResult.data?.map((data) => (
          <IdeaCard key={data.id} idea={data} />
        ))}
    </div>
  );
};

export default IdeaList;
