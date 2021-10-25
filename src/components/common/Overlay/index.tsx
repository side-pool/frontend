import React from 'react';
import cn from 'classnames';
import styles from './Overlay.module.scss';

const Overlay = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(styles.Overlay)}
    data-testid="modal"
    aria-hidden="true"
    {...props}
  />
);

export default Overlay;
