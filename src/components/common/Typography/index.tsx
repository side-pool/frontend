import React, { HTMLAttributes } from 'react';
import styles from './Typography.module.scss';
import { customTypes } from 'custom-types';
import cn from 'classnames';

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
type TextAlign = 'start' | 'center' | 'end';
type LineHeight = 'narrow' | 'normal' | 'wide';
type TextColor = 'titleBlack' | 'black' | 'gray' | 'blueActive';

export interface TypographyProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  fontSize?: customTypes.ElementSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  lineHeight?: LineHeight;
  textColor?: TextColor;
  className?: string;
}

const Typography = ({
  children,
  fontSize = 'md',
  fontWeight = 'regular',
  textAlign = 'start',
  lineHeight = 'normal',
  textColor = 'black',
  className,
  ...props
}: TypographyProps) => {
  return (
    <span
      className={cn(
        styles.Typography,
        styles[fontSize],
        styles[fontWeight],
        styles[textAlign],
        styles[lineHeight],
        styles[textColor],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Typography;
