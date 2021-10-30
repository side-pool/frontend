import React, { HTMLAttributes, RefObject } from 'react';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import Author from '@src/components/common/Author';
import styles from './CommentForm.module.scss';
import cn from 'classnames';

export interface CommentFormProps extends HTMLAttributes<HTMLFormElement> {
  nickname: string;
  commentRef?: RefObject<ParentRef>;
  className?: string;
}

const CommentForm = ({
  nickname,
  commentRef,
  onSubmit,
  className,
  ...props
}: CommentFormProps) => {
  return (
    <form
      className={cn(styles.CommentForm, className)}
      {...props}
      onSubmit={onSubmit}
    >
      <Author nickname={nickname} />
      <Input maxWidth placeholder="댓글을 입력해주세요." ref={commentRef} />
      <Button variant="text" labelText="등록" type="submit" />
    </form>
  );
};

export default CommentForm;
