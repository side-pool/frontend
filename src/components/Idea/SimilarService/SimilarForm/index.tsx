import React, { HTMLAttributes, RefObject } from 'react';
import Input, { ParentRef } from '@src/components/common/Input';
import Button from '@src/components/common/Button';
import Author from '@src/components/common/Author';
import styles from './SimilarForm.module.scss';
import cn from 'classnames';

export interface SimilarFormProps extends HTMLAttributes<HTMLFormElement> {
  nickname: string;
  urlRef: RefObject<ParentRef>;
  descRef: RefObject<ParentRef>;
  className?: string;
}

const SimilarForm = ({
  nickname,
  urlRef,
  descRef,
  onSubmit,
  className,
  ...props
}: SimilarFormProps) => {
  return (
    <form
      className={cn(styles.SimilarForm, className)}
      onSubmit={onSubmit}
      {...props}
    >
      <Author nickname={nickname} />
      <div className={styles.similarInput}>
        <Input maxWidth placeholder="https://" ref={urlRef} />
        <hr />
        <Input
          maxWidth
          placeholder="비슷한 서비스가 있다면 알려주세요."
          ref={descRef}
        />
      </div>
      <Button variant="text" labelText="등록" type="submit" />
    </form>
  );
};

export default SimilarForm;
