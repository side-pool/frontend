import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import './Skeleton.scss';
import { customTypes } from 'custom-types';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle';
  animation?: 'pulse' | 'wave' | 'false';
  size?: customTypes.ElementSize;
  width?: number | string;
  height?: number | string;
  fitContent?: boolean;
  maxWidth?: boolean;
  withChildren?: boolean;
}

const Skeleton = ({
  variant = 'rect',
  animation = 'wave',
  size = 'md',
  fitContent,
  maxWidth,
  withChildren,
  width,
  height,
  children,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn('_SKELETON_', variant, animation, size, {
        fitContent,
        withChildren,
        'max-width': maxWidth,
      })}
      style={{
        width,
        height,
      }}
      data-testid="skeleton"
      {...props}
    >
      {withChildren && children}
    </div>
  );
};

export default Skeleton;
