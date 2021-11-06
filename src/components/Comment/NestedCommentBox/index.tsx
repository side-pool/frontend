import React, { useState } from 'react';
import ReplyIcon from '@src/assets/Reply.svg';
import Author from '@src/components/common/Author';
import styles from './NestedCommentBox.module.scss';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button from '@src/components/common/Button';
import { Comment } from '@src/models';
import { GuideText } from '@src/constant/enums';
import useModalControl from '@src/hooks/useModalControl';
import AlertModal from '@src/components/modals/AlertModal';
import Input from '@src/components/common/Input';
import { UseMutationResult } from 'react-query';
import { AxiosError } from 'axios';

export interface NestedCommentBoxProps {
  ideaId: number;
  commentId: number;
  nestedComment: Comment;
  isMine: boolean;
  updateMutation: UseMutationResult<unknown, AxiosError<unknown>, any, unknown>;
  deleteMutation: UseMutationResult<unknown, AxiosError<unknown>, any, unknown>;
  invalidate: () => void;
}

const NestedCommentBox = ({
  ideaId,
  commentId,
  nestedComment,
  isMine,
  updateMutation,
  deleteMutation,
  invalidate,
}: NestedCommentBoxProps) => {
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
      {
        ideaId,
        commentId,
        content: editTarget,
        nestedCommentId: nestedComment.id,
      },
      {
        onSuccess: () => {
          // TODO: Modal 로 바꾸기
          alert('성공');
          setIsEditing(false);
          invalidate();
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
      { ideaId, commentId, nestedCommentId: nestedComment.id },
      {
        onSuccess: () => {
          // TODO: Modal 로 바꾸기
          alert('성공');
          setIsEditing(false);
          invalidate();
        },
        onError: () => {
          alert('실패');
        },
      },
    );
  };

  return (
    <div className={styles.NestedCommentBox}>
      <ReplyIcon />
      <div className={styles.answer}>
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
                    onClick={handleEdit}
                  />
                  <Button
                    labelText="수정취소"
                    variant="text"
                    onClick={() => setIsEditing(false)}
                  />
                </div>
              ) : (
                <div className={styles.topRightArea}>
                  <Button
                    labelText="수정"
                    variant="text"
                    onClick={() => {
                      setIsEditing(true);
                      nestedComment.content.length &&
                        setEditTarget(nestedComment.content);
                    }}
                  />
                  <Button
                    labelText="삭제"
                    variant="text"
                    onClick={handleRemove}
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
          <Typography className={styles.answerBottom} fontSize="xs">
            {nestedComment.content}
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

export default NestedCommentBox;
