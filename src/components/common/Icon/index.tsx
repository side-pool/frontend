import React, { ReactElement } from 'react';
import cn from 'classnames';
import './Icon.scss';

export interface IconProps {
  iconName?: string;
  size?: number;
  color?: string;
  pointer?: boolean;
}

const Icon = ({
  iconName = 'search',
  size = 24,
  color = 'black',
  pointer = false,
}: IconProps): ReactElement => {
  return (
    <span
      className={cn('material-icons', '_ICON_', { pointer })}
      style={{ fontSize: size, color }}
      data-testid="icon"
    >
      {iconName}
    </span>
  );
};

export default Icon;
