import React, { HTMLAttributes } from 'react';
import styles from './LabelTag.module.scss';
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
    <div className={cn(styles.LabelTag, styles[wrapperColor])} aria-label="">
      <p className={cn(styles.text, styles[textColor])}>{children}</p>
    </div>
  );
}

export default LabelTag;
