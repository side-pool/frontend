import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import cn from 'classnames';
import './Button.scss';
import { customTypes } from 'custom-types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: customTypes.ElementSize;
  variant?: 'ghost' | 'solid' | 'quiet' | 'minimal';
  buttonColor?: customTypes.ElementColor;
  fullWidth?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  labelText?: string;
  children?: ReactElement | string;
}

const Button = ({
  className,
  children,
  size = 'md',
  variant = 'solid',
  disabled,
  fullWidth,
  rounded,
  shadow,
  buttonColor = 'black',
  labelText,
  ...restProps
}: ButtonProps): ReactElement => {
  return (
    <button
      type="button"
      data-testid="button"
      className={cn(`_BUTTON_`, className, size, variant, buttonColor, {
        rounded,
        disabled,
        'full-width': fullWidth,
        shadow,
      })}
      disabled={disabled}
      {...restProps}
    >
      <span>{labelText ? <>{labelText} </> : children}</span>
    </button>
  );
};

export default Button;
