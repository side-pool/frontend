import React from 'react';
import styles from './MyCommentContainer.module.scss';
import MyCommentCard from '@src/components/Comment/MyCommentCard';
import { useReadMyComment } from '@src/hooks/useMyPageQuery';

const MyCommentContainer = () => {
  const { data } = useReadMyComment();

  return (
    <div className={styles.MyCommentContainer}>
      {data?.map((each) => (
        <MyCommentCard key={each.id} {...each} />
      ))}
    </div>
  );
};

export default MyCommentContainer;
