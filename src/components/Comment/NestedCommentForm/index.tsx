import React, { HTMLAttributes, RefObject } from 'react';
import Input, { ParentRef } from '@src/components/common/Input';
import ReplyIcon from '@src/assets/Reply.svg';
import Button from '@src/components/common/Button';
import Author from '@src/components/common/Author';
import styles from './NestedCommentForm.module.scss';
import cn from 'classnames';

export interface CommentFormProps extends HTMLAttributes<HTMLFormElement> {
  nickname: string;
  commentRef?: RefObject<ParentRef>;
  className?: string;
}

const NestedCommentForm = ({
  nickname,
  commentRef,
  onSubmit,
  className,
  ...props
}: CommentFormProps) => {
  return (
    <form
      className={cn(styles.NestedCommentForm, className)}
      {...props}
      onSubmit={onSubmit}
    >
      <ReplyIcon />
      <div className={styles.answer}>
        <div className={styles.topArea}>
          <Author nickname={nickname} />
        </div>
        <div className={styles.bottomArea}>
          <Input maxWidth placeholder="댓글을 입력해주세요." ref={commentRef} />
          <Button variant="text" labelText="등록" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default NestedCommentForm;
