import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import Card from '@src/components/common/Card';
import Button from '@src/components/common/Button';

import styles from './Modal.module.scss';
import Typography from '../Typography';

interface Children {
  children?: React.ReactChild;
}

export interface ModalProps extends Children {
  closeModal: () => void;
  headerText?: string;
  footer?: {
    cancelButton?: React.ReactElement;
    submitButton?: React.ReactElement;
  };
  zIndex?: number;
  className?: string;
  isWide?: boolean;
  isVisible: boolean;
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
  headerText,
  footer,
  className,
  isWide,
  isVisible,
}: ModalProps) => {
  const [fadeout, setFadeout] = useState(false);

  const handleCloseModal = async () => {
    await setFadeout(true);

    setTimeout(() => {
      closeModal();
      setFadeout(false);
    }, 500);
  };

  return (
    <Portal>
      <div
        className={cn(
          styles.Modal,
          fadeout && styles.fadeout,
          isVisible ? styles.isVisible : styles.isNotVisible,
          className,
        )}
        data-testid="modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleCloseModal();
          }
        }}
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
              {footer.cancelButton ? (
                footer.cancelButton
              ) : (
                <Button onClick={handleCloseModal}>취소</Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </Portal>
  );
};

export default Modal;
