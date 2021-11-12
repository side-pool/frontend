import React from 'react';
import styles from './MyCommentList.module.scss';
import MyCommentCard from '@src/components/Comment/MyCommentCard';
import { useReadMyComment } from '@src/hooks/useMyPageQuery';

const MyCommentList = () => {
  const { data } = useReadMyComment();

  return (
    <div className={styles.MyCommentList}>
      {data?.map((each) => (
        <MyCommentCard key={each.id} {...each} />
      ))}
    </div>
  );
};

export default MyCommentList;
