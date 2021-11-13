import React, { HTMLAttributes } from 'react';
import styles from './Card.module.scss';
import cn from 'classnames';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn(styles.Card, className)} {...props} aria-hidden>
      {children}
    </div>
  );
}

export default Card;
