import React, { HTMLAttributes } from 'react';

import Icon from '@src/components/common/Icon';

import styles from './LabelTag.module.scss';
import cn from 'classnames';

export interface LabelTagProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  wrapperColor?:
    | 'gray'
    | 'orange'
    | 'beige'
    | 'white'
    | 'pink'
    | 'red'
    | 'blue'
    | 'purple'
    | 'green'
    | 'darkGreen';
  textColor?: 'white' | 'orange' | 'green';
  isDeleteButton?: boolean;
}

const LabelTag = ({
  children,
  wrapperColor = 'gray',
  textColor = 'white',
  className,
  isDeleteButton = false,
  ...props
}: LabelTagProps) => {
  return (
    <div
      className={cn(
        styles.LabelTag,
        styles[wrapperColor],
        className,
        isDeleteButton && styles.isDeleteButton,
      )}
    >
      <p className={cn(styles.text, styles[textColor])}>{children}</p>
      {isDeleteButton && (
        <div {...props}>
          <Icon iconName="close" color="white" size={14} />
        </div>
      )}
    </div>
  );
};

export const HashTag = ({ ...props }: LabelTagProps) => (
  <LabelTag {...props} className="hashTag" />
);

const commentTagInfos = [
  { desc: '칭찬', wrapperColor: 'pink' },
  { desc: '버그 제보', wrapperColor: 'red' },
  { desc: '개발 피드백', wrapperColor: 'blue' },
  { desc: '디자인 피드백', wrapperColor: 'purple' },
  { desc: '기획 피드백', wrapperColor: 'green' },
  { desc: '팀 빌딩 관련', wrapperColor: 'darkGreen' },
] as const;

interface CommentTagProps {
  commentTag: number;
}

export const CommentTag = ({ commentTag, ...props }: CommentTagProps) => {
  const commentTagInfo = commentTagInfos[commentTag];

  return (
    <>
      <LabelTag
        wrapperColor={commentTagInfo.wrapperColor}
        textColor="white"
        className="commentTag"
        {...props}
      >
        {commentTagInfo.desc}
      </LabelTag>
    </>
  );
};

export default LabelTag;
