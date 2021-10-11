import React, { ReactElement } from 'react';
import cn from 'classnames';
import styles from './Icon.module.scss';

export interface IconProps {
  iconName?: string;
  size?: number;
  color?: string;
  bold?: boolean;
  pointer?: boolean;
}

const Icon = ({
  iconName = 'search',
  size = 24,
  color = 'black',
  bold = false,
  pointer = false,
}: IconProps): ReactElement => {
  return (
    <span
      className={cn(
        'material-icons',
        styles.Icon,
        pointer && styles.pointer,
        bold && styles.bold,
      )}
      style={{ fontSize: size, color }}
      data-testid="icon"
    >
      {iconName}
    </span>
  );
};

export default Icon;
