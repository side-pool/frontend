import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import Icon from '@src/components/common/Icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'floating' | 'text';
  primary?: boolean;
  fullWidth?: boolean;
  labelText?: string;
  children?: ReactNode;
}

const Button = ({
  children,
  variant = 'normal',
  primary,
  disabled,
  fullWidth,
  labelText,
  ...restProps
}: ButtonProps): ReactElement => {
  return (
    <button
      type="button"
      data-testid="button"
      className={cn(
        styles.Button,
        styles[variant],
        primary && styles.primary,
        disabled && styles.disabled,
        fullWidth && variant !== 'floating' && styles.fullWidth,
      )}
      disabled={disabled}
      {...restProps}
    >
      {variant === 'floating' ? (
        <Icon iconName="add" color="white" size={35} bold pointer />
      ) : (
        <span>{labelText ? <> {labelText} </> : children}</span>
      )}
    </button>
  );
};

export default Button;
