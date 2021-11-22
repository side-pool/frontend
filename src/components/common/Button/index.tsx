import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import Add from '@src/assets/Add.svg';
import UpArrow from '@src/assets/UpArrow.svg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'floating' | 'text';
  primary?: boolean;
  fullWidth?: boolean;
  labelText?: string;
  iconName?: string;
  className?: string;
  children?: ReactNode;
}

const Button = ({
  children,
  variant = 'normal',
  primary,
  disabled,
  fullWidth,
  labelText,
  iconName,
  className,
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
        className,
      )}
      disabled={disabled}
      {...restProps}
    >
      {variant === 'floating' && iconName ? (
        {
          add: <Add />,
          expand_less: <UpArrow />,
        }[iconName]
      ) : (
        <span>{labelText ? <> {labelText} </> : children}</span>
      )}
    </button>
  );
};

interface NestedCommentToggleBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggle: boolean;
}

export const NestedCommentToggleBtn = ({
  toggle,
  ...props
}: NestedCommentToggleBtnProps) => {
  return (
    <Button
      labelText={toggle ? '대댓글접기' : '대댓글펼치기'}
      variant="text"
      {...props}
    />
  );
};

export default Button;
