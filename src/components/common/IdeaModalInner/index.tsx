import React from 'react';

import Input from '@src/components/common/Input';
import Textarea from '@src/components/common/Textarea';

import styles from './IdeaModalInner.module.scss';

const IdeaModalInner = () => {
  return (
    <div className={styles.IdeaModalInner}>
      <div className={styles.titleArea}>
        <Input placeholder="제목을 입력해주세요." maxWidth />
      </div>
      <div className={styles.contentArea}>
        <Textarea placeholder="내용을 입력해주세요." maxWidth />
      </div>
      <div className={styles.hashtagArea}>
        <Input placeholder="#을 이용해 태그를 입력해보세요." maxWidth />
      </div>
    </div>
  );
};

export default IdeaModalInner;
