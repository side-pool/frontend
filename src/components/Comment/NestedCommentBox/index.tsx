import React, { Dispatch } from 'react';
import ReplyIcon from '@src/assets/Reply.svg';
import Author from '@src/components/common/Author';
import styles from './NestedCommentBox.module.scss';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button from '@src/components/common/Button';
import { Comment } from '@src/models';
import Input from '@src/components/common/Input';

export interface NestedCommentBoxProps {
  nestedComment: Comment;
  isMine: boolean;
  clickUpdateBtn: () => void;
  clickDeleteBtn: () => void;
  clickCancelUpdateBtn: () => void;
  clickCompleteUpdateBtn: () => void;
  isEditing: boolean;
  editTarget: string;
  setEditTarget: Dispatch<React.SetStateAction<string>>;
}

const NestedCommentBox = ({
  nestedComment,
  isMine,
  clickUpdateBtn,
  clickDeleteBtn,
  clickCancelUpdateBtn,
  clickCompleteUpdateBtn,
  isEditing,
  editTarget,
  setEditTarget,
}: NestedCommentBoxProps) => {
  return (
    <div className={styles.NestedCommentBox}>
      <ReplyIcon />
      <div className={styles.comment}>
        <div className={styles.topArea}>
          <div className={styles.topLeftArea}>
            <Author nickname={nestedComment.author.nickname} />
            <Typography
              textColor="gray"
              fontSize="xxs"
              className={styles.writtenDate}
            >
              {getDiffTime({
                newDate: new Date(),
                oldDate: new Date(nestedComment.updatedDate),
              })}
            </Typography>
          </div>
          {isMine && (
            <>
              {isEditing ? (
                <div className={styles.topRightArea}>
                  <Button
                    labelText="수정완료"
                    variant="text"
                    onClick={clickCompleteUpdateBtn}
                  />
                  <Button
                    labelText="수정취소"
                    variant="text"
                    onClick={clickCancelUpdateBtn}
                  />
                </div>
              ) : (
                <div className={styles.topRightArea}>
                  <Button
                    labelText="수정"
                    variant="text"
                    onClick={clickUpdateBtn}
                  />
                  <Button
                    labelText="삭제"
                    variant="text"
                    onClick={clickDeleteBtn}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {isEditing ? (
          <Input
            maxWidth
            placeholder=""
            value={editTarget}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditTarget(e.target?.value)
            }
          />
        ) : (
          <Typography fontSize="xs">{nestedComment.content}</Typography>
        )}
      </div>
    </div>
  );
};

export default NestedCommentBox;
