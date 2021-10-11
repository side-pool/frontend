import React, { HTMLAttributes } from 'react';
import styles from './Text.module.scss';
import { customTypes } from 'custom-types';
import cn from 'classnames';

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
type TextAlign = 'start' | 'center' | 'end';
type LineHeight = 'narrow' | 'normal' | 'wide';
type TextColor = 'titleBlack' | 'black' | 'gray';

export interface TextProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  fontSize?: customTypes.ElementSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  lineHeight?: LineHeight;
  textColor?: TextColor;
}

const Text = ({
  children,
  fontSize = 'md',
  fontWeight = 'regular',
  textAlign = 'start',
  lineHeight = 'normal',
  textColor = 'black',
}: TextProps) => {
  return (
    <span
      className={cn(
        styles.Text,
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

export default Text;
