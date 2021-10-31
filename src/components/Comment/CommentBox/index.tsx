import React from 'react';
import Author from '@src/components/common/Author';
import styles from './CommentBox.module.scss';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button from '@src/components/common/Button';
import cn from 'classnames';
import { Comment } from '@src/models';

export interface CommentBoxProps {
  comment: Comment;
  isAuth: boolean;
  handleEdit?: () => void;
  handleRemove?: () => void;
  isNestedFormOpened: boolean;
  setIsNestedFormOpened: (isNestedFormOpened: boolean) => void;
  isNestedOpened: boolean;
  setIsNestedOpened: (isNestedOpened: boolean) => void;
}

const CommentBox = ({
  comment,
  isAuth,
  isNestedFormOpened,
  setIsNestedFormOpened,
  isNestedOpened,
  setIsNestedOpened,
}: CommentBoxProps) => {
  return (
    <div className={cn(styles.CommentBox)}>
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
              <Button
                labelText={isNestedFormOpened ? '답글닫기' : '답글달기'}
                variant="text"
                onClick={() => {
                  setIsNestedFormOpened(!isNestedFormOpened);
                  !isNestedOpened && setIsNestedOpened(true);
                }}
              />
              <Button
                labelText={isNestedOpened ? '대댓글접기' : '대댓글펼치기'}
                variant="text"
                onClick={() => {
                  setIsNestedOpened(!isNestedOpened);
                }}
              />
              <div className={styles.updownBorder} />
              <Button labelText="수정" variant="text" />
              <Button labelText="삭제" variant="text" />
            </div>
          )}
        </div>
        <Typography className={styles.answerBottom} fontSize="xs">
          {comment.content}
        </Typography>
      </div>
    </div>
  );
};

export default CommentBox;
