import React, { Dispatch } from 'react';
import Author from '@src/components/common/Author';
import styles from './CommentBox.module.scss';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button, { NestedCommentToggleBtn } from '@src/components/common/Button';
import cn from 'classnames';
import { Comment } from '@src/models';
import Input from '@src/components/common/Input';

export interface CommentBoxProps {
  comment: Comment;
  isNestedOpened: boolean;
  setIsNestedOpened: (isNestedOpened: boolean) => void;
  isMine: boolean;
  clickUpdateBtn: () => void;
  clickDeleteBtn: () => void;
  clickCancelUpdateBtn: () => void;
  clickCompleteUpdateBtn: () => void;
  isEditing: boolean;
  editTarget: string;
  setEditTarget: Dispatch<React.SetStateAction<string>>;
}

const CommentBox = ({
  comment,
  isNestedOpened,
  setIsNestedOpened,
  isMine,
  clickUpdateBtn,
  clickDeleteBtn,
  clickCancelUpdateBtn,
  clickCompleteUpdateBtn,
  isEditing,
  editTarget,
  setEditTarget,
}: CommentBoxProps) => {
  // TODO: 리팩터링

  return (
    <div className={cn(styles.CommentBox)}>
      <div className={styles.answer}>
        <div className={styles.topArea}>
          <div className={styles.topLeftArea}>
            <Author nickname={comment.author.nickname} />
            <Typography textColor="gray" fontSize="xxs">
              {getDiffTime({
                newDate: new Date(),
                oldDate: new Date(comment.updatedDate),
              })}
            </Typography>
          </div>
          <div className={styles.topRightArea}>
            <NestedCommentToggleBtn
              toggle={isNestedOpened}
              onClick={() => {
                setIsNestedOpened(!isNestedOpened);
              }}
            />
            {isMine && (
              <>
                <div className={styles.updownBorder} />
                {isEditing ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>
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
          <Typography className={styles.answerBottom} fontSize="xs">
            {comment.content}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
