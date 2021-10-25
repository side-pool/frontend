import React from 'react';
import styles from './ModalTop.module.scss';
import Typography from '@src/components/common/Typography';

export interface MoalTopProps {
  title?: string;
}

const ModalTop = ({ title = '알림' }: MoalTopProps) => {
  return (
    <div className={styles.ModalTop}>
      <Typography fontSize="md" fontWeight="medium" textColor="blueActive">
        {title}
      </Typography>
    </div>
  );
};

export default ModalTop;
