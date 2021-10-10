import React, { HTMLAttributes } from 'react';
import S from './Card.module.scss';

export type CardProps = HTMLAttributes<HTMLDivElement>;

function Card({ children }: CardProps) {
  return <div className={S.Card}>{children}</div>;
}

export default Card;
