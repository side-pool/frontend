import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Gnb.module.scss';
import useScrollPosition from '@src/hooks/useScrollPosition';

const Gnb = () => {
  const { isActive } = useScrollPosition();

  return <div className={cn(styles.Gnb, isActive && styles.isActiveGnb)}></div>;
};

export default Gnb;
