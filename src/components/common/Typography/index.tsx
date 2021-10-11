import React, { HTMLAttributes } from 'react';
import styles from './Typography.module.scss';
import { customTypes } from 'custom-types';
import cn from 'classnames';

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
type TextAlign = 'start' | 'center' | 'end';
type LineHeight = 'narrow' | 'normal' | 'wide';
type TextColor = 'titleBlack' | 'black' | 'gray';

export interface TypographyProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  fontSize?: customTypes.ElementSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  lineHeight?: LineHeight;
  textColor?: TextColor;
}

const Typography = ({
  children,
  fontSize = 'md',
  fontWeight = 'regular',
  textAlign = 'start',
  lineHeight = 'normal',
  textColor = 'black',
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
      )}
    >
      {children}
    </span>
  );
};

export default Typography;
