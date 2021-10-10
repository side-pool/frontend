import React, { useEffect, useState, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import './Modal.scss';
import Icon from '@src/components/common/Icon';

interface Children {
  children?: React.ReactChild;
}

export interface ModalProps extends Children {
  className?: string;
  variant?: 'default' | 'alt';
  closeModal?: () => void;
  fadeout?: boolean;
  headerText?: string;
  footer?: {
    cancelButton?: React.ReactElement;
    submitButton?: React.ReactElement;
    BtnAlign?: 'start' | 'center' | 'end' | 'space-between';
  };
  zIndex?: number;
  width?: number;
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
  className,
  headerText,
  footer,
  width,
}: ModalProps) => {
  const handleCloseModal = (e: MouseEvent) => {
    if (closeModal && e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Portal>
      <div
        className={cn('_MODAL_', { fadeout })}
        data-testid="modal"
        onClick={handleCloseModal}
        aria-hidden="true"
      >
        <div className={cn('modal-content-box', className)} style={{ width }}>
          {closeModal && (
            <div
              className={cn('close-button')}
              onClick={closeModal}
              aria-hidden="true"
            >
              <Icon size={28} iconName="close" pointer />
            </div>
          )}
          {headerText && <div className="modal-header">{headerText}</div>}
          <div className={cn('modal-content')}>{children}</div>
          {footer && (
            <div className={cn('footer', footer.BtnAlign || 'end')}>
              {footer.cancelButton}
              {footer.submitButton}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
