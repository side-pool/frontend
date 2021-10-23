import React from 'react';
import cn from 'classnames';
import styles from './Overlay.module.scss';

export interface OverlayProps {
  close?: (event: React.MouseEvent) => void;
  className?: string;
}

const Overlay = ({ close, className }: OverlayProps) => {
  return (
    <div
      className={cn(styles.Overlay, className)}
      data-testid="modal"
      aria-hidden="true"
      onClick={close}
    />
  );
};

export default Overlay;
