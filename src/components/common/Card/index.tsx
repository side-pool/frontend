import React, { HTMLAttributes } from 'react';
import styles from './Card.module.scss';

export type CardProps = HTMLAttributes<HTMLDivElement>;

function Card({ children }: CardProps) {
  return <div className={styles.Card}>{children}</div>;
}

export default Card;
