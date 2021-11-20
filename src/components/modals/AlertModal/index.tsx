import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './AlertModal.module.scss';
import Card from '@src/components/common/Card';
import { convertPortal } from '@src/utils/portalUtils';
import Overlay from '@src/components/common/Overlay';
import ModalTop from '@src/components/modals/ModalTop';
import ModalBottom from '@src/components/modals/ModalBottom';

export interface AlertModalProps {
  content: string;
  handleConfirm: (event: React.MouseEvent) => void;
  handleCancel?: (event: React.MouseEvent) => void;
  title?: string;
  className?: string;
}

const Template = ({
  title = '알림',
  content,
  handleConfirm,
  handleCancel,
  className,
}: AlertModalProps) => {
  // TODO: 타입 추후 정의
  const handleAlertClose = (e: any) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      handleConfirm(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleAlertClose, false);
    return () => document.removeEventListener('keyup', handleAlertClose, false);
  }, []);

  return (
    <div
      className={cn(styles.AlertModal, className)}
      data-testid="modal"
      aria-hidden="true"
    >
      <Overlay onClick={handleCancel ? handleCancel : handleConfirm} />
      <Card className={styles.alertCard}>
        <ModalTop title={title} />
        <div className={styles.content}>{content}</div>
        <ModalBottom handleConfirm={handleConfirm} />
      </Card>
    </div>
  );
};

const AlertModal = ({ ...props }: AlertModalProps) =>
  convertPortal(<Template {...props} />);

export default AlertModal;
