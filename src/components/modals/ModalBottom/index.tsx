import React from 'react';
import styles from './ModalBottom.module.scss';
import Button from '@src/components/common/Button';

export interface MoalTopProps {
  handleConfirm: (event: React.MouseEvent) => void;
  handleCancel?: (event: React.MouseEvent) => void;
}

const ModalBottom = ({ handleConfirm, handleCancel }: MoalTopProps) => {
  return (
    <div className={styles.ModalBottom}>
      <Button onClick={handleConfirm} primary>
        확인
      </Button>
      {handleCancel && <Button onClick={handleCancel}>취소</Button>}
    </div>
  );
};

export default ModalBottom;
