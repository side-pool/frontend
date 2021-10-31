import React, { HTMLAttributes } from 'react';

import Icon from '@src/components/common/Icon';

import styles from './LabelTag.module.scss';
import cn from 'classnames';

export interface LabelTagProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  wrapperColor?: 'gray' | 'orange' | 'beige' | 'white';
  textColor?: 'white' | 'orange' | 'green';
  isDeleteButton?: boolean;
}

function LabelTag({
  children,
  wrapperColor = 'gray',
  textColor = 'white',
  className,
  isDeleteButton = false,
  ...props
}: LabelTagProps) {
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
}

export default LabelTag;
