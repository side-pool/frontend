import React from 'react';
import cn from 'classnames';
import styles from './AlertModal.module.scss';
import Card from '@src/components/common/Card';
import { convertPortal } from '@src/utils/portalUtils';
import Typography from '@src/components/common/Typography';
import Button from '@src/components/common/Button';
import Overlay from '@src/components/common/Overlay';

export interface AlertModalProps {
  content: string;
  handleConfirm: (event: React.MouseEvent) => void;
  title?: string;
  className?: string;
}

const Template = ({
  title = '알림',
  content,
  handleConfirm,
  className,
}: AlertModalProps) => {
  return (
    <div
      className={cn(styles.AlertModal, className)}
      data-testid="modal"
      aria-hidden="true"
    >
      <Overlay onClick={handleConfirm} />
      <Card className={styles.alertCard}>
        <div className={styles.title}>
          <Typography
            fontSize={'md'}
            fontWeight={'medium'}
            textColor="blueActive"
          >
            {title}
          </Typography>
        </div>
        <div className={styles.content}>{content}</div>
        <div className={styles.footer}>
          <Button onClick={handleConfirm}>확인</Button>
        </div>
      </Card>
    </div>
  );
};

const AlertModal = ({ ...props }: AlertModalProps) =>
  convertPortal(<Template {...props} />);

export default AlertModal;
