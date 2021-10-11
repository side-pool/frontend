import React, { HTMLAttributes } from 'react';
import S from './LabelTag.module.scss';
import cn from 'classnames';

export interface LabelTagProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  wrapperColor?: 'gray' | 'orange' | 'beige';
  textColor?: 'white' | 'orange';
}

function LabelTag({
  children,
  wrapperColor = 'gray',
  textColor = 'white',
}: LabelTagProps) {
  return (
    <div className={cn(S.LabelTag, S[wrapperColor])} aria-label="">
      <p className={cn(S.text, S[textColor])}>{children}</p>
    </div>
  );
}

export default LabelTag;
