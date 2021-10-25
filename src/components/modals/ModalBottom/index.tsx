import React from 'react';
import styles from './ModalBottom.module.scss';
import Button from '@src/components/common/Button';

export interface MoalTopProps {
  handleConfirm: (event: React.MouseEvent) => void;
  handleCancel?: (event: React.MouseEvent) => void;
  confirmText?: string;
}

const ModalBottom = ({
  handleConfirm,
  handleCancel,
  confirmText = '확인',
}: MoalTopProps) => {
  return (
    <div className={styles.ModalBottom}>
      <Button onClick={handleConfirm} primary>
        {confirmText}
      </Button>
      {handleCancel && <Button onClick={handleCancel}>취소</Button>}
    </div>
  );
};

export default ModalBottom;
