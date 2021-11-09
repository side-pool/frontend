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
  // 서버에서 패치받은 데이터
  comment: Comment;
  isMine: boolean;
  // UI 조작을 위한 데이터
  isNestedOpened: boolean;
  isEditing: boolean;
  editTarget: string;
  setIsNestedOpened: (isNestedOpened: boolean) => void;
  setEditTarget: Dispatch<React.SetStateAction<string>>;
  // 버튼 이벤트 핸들러
  clickUpdateBtn: () => void;
  clickDeleteBtn: () => void;
  clickCancelUpdateBtn: () => void;
  clickCompleteUpdateBtn: () => void;
}

const CommentBox = ({
  comment,
  isMine,
  isNestedOpened,
  setIsNestedOpened,
  isEditing,
  editTarget,
  setEditTarget,
  clickUpdateBtn,
  clickDeleteBtn,
  clickCancelUpdateBtn,
  clickCompleteUpdateBtn,
}: CommentBoxProps) => {
  // TODO: 리팩터링

  return (
    <div className={cn(styles.CommentBox)}>
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
        <Typography fontSize="xs">{comment.content}</Typography>
      )}
    </div>
  );
};

export default CommentBox;
