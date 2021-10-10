import React from 'react';
import cn from 'classnames';
import './Spinner.scss';
import { customTypes } from 'custom-types';

export interface SpinnerProps {
  size?: customTypes.ElementSize;
}

export const Spinner = ({ size = 'md', ...props }: SpinnerProps) => {
  return (
    <div className={cn('_SPINNER_', size)} {...props} data-testid="spinner" />
  );
};

export default Spinner;
