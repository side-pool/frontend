import React from 'react';
import cn from 'classnames';
import styles from './ConfirmModal.module.scss';
import Card from '@src/components/common/Card';
import { convertPortal } from '@src/utils/portalUtils';
import Overlay from '@src/components/common/Overlay';
import ModalTop from '@src/components/modals/ModalTop';
import ModalBottom from '@src/components/modals/ModalBottom';

export interface ConfirmModalProps {
  content: string;
  handleConfirm: (event: React.MouseEvent) => void;
  handleCancel: (event: React.MouseEvent) => void;
  title?: string;
  className?: string;
}

const Template = ({
  title = '알림',
  content,
  handleConfirm,
  handleCancel,
  className,
}: ConfirmModalProps) => {
  return (
    <div
      className={cn(styles.ConfirmModal, className)}
      data-testid="modal"
      aria-hidden="true"
    >
      <Overlay onClick={handleCancel} />
      <Card className={styles.confirmCard}>
        <ModalTop title={title} />
        <div className={styles.content}>{content}</div>
        <ModalBottom
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      </Card>
    </div>
  );
};

const ConfirmModal = ({ ...props }: ConfirmModalProps) =>
  convertPortal(<Template {...props} />);

export default ConfirmModal;
