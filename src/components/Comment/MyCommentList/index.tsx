import React from 'react';
import styles from './MyCommentList.module.scss';
import MyCommentContainer from '@src/components/Comment/MyCommentContainer';
import { useReadMyComment } from '@src/hooks/useMyPageQuery';
import Typography from '@src/components/common/Typography';

const MyCommentList = () => {
  const { data } = useReadMyComment();

  return (
    <div className={styles.MyCommentList}>
      {(data || []).length > 0 ? (
        <>
          {data?.map((each) => (
            <MyCommentContainer key={each.id} {...each} />
          ))}
        </>
      ) : (
        <Typography
          className={styles.myCommentTypography}
          fontSize="md"
          textColor="lightGray"
        >
          아직 작성된 글이 없습니다.
        </Typography>
      )}
    </div>
  );
};

export default MyCommentList;
