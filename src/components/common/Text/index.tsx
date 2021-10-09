import React, { HTMLAttributes } from 'react';
import './Text.scss';
import cn from 'classnames';
import { customTypes } from 'custom-types';

type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
type TextAlign = 'start' | 'center' | 'end';
type LineHeight = 'narrow' | 'normal' | 'wide';

export interface TextProps
  extends HTMLAttributes<
    HTMLDivElement | HTMLSpanElement | HTMLHeadingElement
  > {
  className?: string;
  fontSize?: customTypes.ElementSize;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  lineHeight?: LineHeight;
}

const Text = ({
  children,
  className,
  fontSize = 'md',
  fontWeight = 'regular',
  textAlign = 'start',
  lineHeight = 'normal',
}: TextProps) => {
  return (
    <span
      className={cn(
        `_TEXT_`,
        `font-size-${fontSize}`,
        `font-weight-${fontWeight}`,
        `text-align-${textAlign}`,
        `line-height-${lineHeight}`,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Text;
