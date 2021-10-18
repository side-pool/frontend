import React, { useEffect, useState, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import Card from '@src/components/common/Card';

import styles from './Modal.module.scss';
import Typography from '../Typography';

interface Children {
  children?: React.ReactChild;
}

export interface ModalProps extends Children {
  variant?: 'default' | 'alt';
  closeModal?: () => void;
  fadeout?: boolean;
  headerText?: string;
  footer?: {
    cancelButton?: React.ReactElement;
    submitButton?: React.ReactElement;
  };
  zIndex?: number;
  className?: string;
  isWide?: boolean;
}

const PORTAL_ID = 'portal';

export const Portal = ({ children }: Children): React.ReactPortal | null => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portalElement = document.getElementById(PORTAL_ID);

    if (!portalElement) {
      const tempElement = document.createElement('div');

      tempElement.id = PORTAL_ID;

      document.body.appendChild(tempElement);
    }

    setElement(document.getElementById(PORTAL_ID));
  }, []);

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
};

const Modal = ({
  children,
  closeModal,
  fadeout,
  headerText,
  footer,
  className,
  isWide,
}: ModalProps) => {
  const handleCloseModal = (e: MouseEvent) => {
    if (closeModal && e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Portal>
      <div
        className={cn(
          styles.Modal,
          fadeout ? styles.fadeout : styles.fadein,
          className,
        )}
        data-testid="modal"
        onClick={handleCloseModal}
        aria-hidden="true"
      >
        <Card className={cn(isWide && styles.isWide)}>
          {headerText && (
            <div className={styles.modalHeader}>
              <Typography
                fontSize={'md'}
                fontWeight={'medium'}
                textColor="blueActive"
              >
                {headerText}
              </Typography>
            </div>
          )}
          <div className={styles.modalContent}>{children}</div>
          {footer && (
            <div className={styles.footer}>
              {footer.submitButton}
              {footer.cancelButton}
            </div>
          )}
        </Card>
      </div>
    </Portal>
  );
};

export default Modal;
