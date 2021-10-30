import React from 'react';
import ReplyIcon from '@src/assets/Reply.svg';
import Author from '@src/components/common/Author';
import styles from './NestedCommentBox.module.scss';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button from '@src/components/common/Button';
import { Comment } from '@src/models';

export interface CommentBoxProps {
  comment: Comment;
  isAuth: boolean;
}

const NestedCommentBox = ({ comment, isAuth }: CommentBoxProps) => {
  return (
    <div className={styles.NestedCommentBox}>
      <ReplyIcon />
      <div className={styles.answer}>
        <div className={styles.topArea}>
          <div className={styles.topLeftArea}>
            <Author nickname={comment.author.nickname} />
            <Typography
              textColor="gray"
              fontSize="xxs"
              className={styles.writtenDate}
            >
              {getDiffTime({
                newDate: new Date(),
                oldDate: new Date(comment.updatedDate),
              })}
            </Typography>
          </div>
          {isAuth && (
            <div className={styles.topRightArea}>
              <Button labelText="수정" variant="text" />
              <Button labelText="삭제" variant="text" />
            </div>
          )}
        </div>
        <Typography className={styles.bottomArea} fontSize="xs">
          {comment.content}
        </Typography>
      </div>
    </div>
  );
};

export default NestedCommentBox;
