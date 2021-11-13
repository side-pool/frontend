import React, { InputHTMLAttributes } from 'react';

import cn from 'classnames';
import { HashTag } from '@src/components/common/LabelTag';
import styles from './HashtagInput.module.scss';

export interface Hashtag {
  id: string;
  content: string;
}

export interface HashtagInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: boolean;
  hashtagArr?: Hashtag[];
  deleteHashtag: (targetId: string) => void;
}

const HashtagInput = ({
  maxWidth,
  hashtagArr = [],
  deleteHashtag,
  ...restProps
}: HashtagInputProps) => {
  return (
    <div className={cn(styles.HashtagInput, maxWidth && styles.maxWidth)}>
      <div className={styles.tagContainer}>
        {hashtagArr.map(({ id, content }) => (
          <HashTag key={id} isDeleteButton onClick={() => deleteHashtag(id)}>
            {content}
          </HashTag>
        ))}
      </div>
      <input className={styles.inputArea} {...restProps} />
    </div>
  );
};

export default HashtagInput;
