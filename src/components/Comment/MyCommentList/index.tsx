import React from 'react';
import styles from './MyCommentList.module.scss';
import MyCommentContainer from '@src/components/Comment/MyCommentContainer';
import { useReadMyComment } from '@src/hooks/useMyPageQuery';

const MyCommentList = () => {
  const { data } = useReadMyComment();

  return (
    <div className={styles.MyCommentList}>
      {data?.map((each) => (
        <MyCommentContainer key={each.id} {...each} />
      ))}
    </div>
  );
};

export default MyCommentList;
