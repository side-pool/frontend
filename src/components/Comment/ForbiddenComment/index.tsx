import React from 'react';
import Typography from '@src/components/common/Typography';
import styles from './ForbiddenComment.module.scss';
import ReplyIcon from '@src/assets/Reply.svg';

interface ForbiddenCommentProps {
  isNested?: boolean;
  content?: string;
}

const COMMENT_PLZ = '로그인 후 댓글을 입력해주세요.';

const ForbiddenComment = ({
  isNested = false,
  content = COMMENT_PLZ,
}: ForbiddenCommentProps) => {
  return (
    <div className={styles.ForbiddenComment}>
      {isNested && <ReplyIcon />}
      <Typography textColor="lightGray">{content}</Typography>
    </div>
  );
};

export default ForbiddenComment;
