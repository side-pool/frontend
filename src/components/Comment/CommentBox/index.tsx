import React, { useState } from 'react';
import Author from '@src/components/common/Author';
import styles from './CommentBox.module.scss';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button, { NestedCommentToggleBtn } from '@src/components/common/Button';
import cn from 'classnames';
import { Comment } from '@src/models';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import Input from '@src/components/common/Input';
import { UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

export interface CommentBoxProps {
  comment: Comment;
  ideaId: number;
  isNestedOpened: boolean;
  setIsNestedOpened: (isNestedOpened: boolean) => void;
  isMine: boolean;
  updateMutation: UseMutationResult<unknown, AxiosError<unknown>, any, unknown>;
  deleteMutation: UseMutationResult<unknown, AxiosError<unknown>, any, unknown>;
}

const CommentBox = ({
  comment,
  ideaId,
  isNestedOpened,
  setIsNestedOpened,
  isMine,
  updateMutation,
  deleteMutation,
}: CommentBoxProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTarget, setEditTarget] = useState<string>('');

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const handleConfirm = () => {
    hideAlert();
  };

  const handleEdit = () => {
    if (editTarget.length === 0) {
      showAlert(GuideText.FILL_A_FORM);
      return;
    }

    // submit to server
    updateMutation.mutate(
      { ideaId, commentId: comment.id, content: editTarget },
      {
        onSuccess: () => {
          // TODO: Modal 로 바꾸기
          alert('성공');
          setIsEditing(false);
        },
        onError: () => {
          alert('실패');
        },
      },
    );
  };

  const handleRemove = () => {
    const result = confirm('지울꼬야?');

    if (!result) {
      return;
    }

    deleteMutation.mutate(
      { ideaId, commentId: comment.id },
      {
        onSuccess: () => {
          // TODO: Modal 로 바꾸기
          alert('성공');
          setIsEditing(false);
        },
        onError: () => {
          alert('실패');
        },
      },
    );
  };

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
            <div className={styles.updownBorder} />
            {isMine && (
              <>
                {isEditing ? (
                  <>
                    <Button
                      labelText="수정완료"
                      variant="text"
                      onClick={handleEdit}
                    />
                    <Button
                      labelText="수정취소"
                      variant="text"
                      onClick={() => setIsEditing(false)}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      labelText="수정"
                      variant="text"
                      onClick={() => {
                        setIsEditing(true);
                        comment.content.length &&
                          setEditTarget(comment.content);
                      }}
                    />
                    <Button
                      labelText="삭제"
                      variant="text"
                      onClick={handleRemove}
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
      {isAlertVisible && (
        <>
          <AlertModal content={alertMessage} handleConfirm={handleConfirm} />
        </>
      )}
    </div>
  );
};

export default CommentBox;
