import React from 'react';
import cn from 'classnames';
import styles from './IdeaModal.module.scss';
import { convertPortal } from '@src/utils/portalUtils';
import { useReadIdea } from '@src/hooks/useIdeaQuery';
import Overlay from '@src/components/common/Overlay';
import IdeaCard from '@src/components/Idea/IdeaCard';
import LazyLoad from 'react-lazyload';

export interface IdeaModalProps {
  hideIdeaForm: (event?: React.MouseEvent) => void;
  className?: string;
  id: number;
}

const Template = ({ hideIdeaForm, className, id }: IdeaModalProps) => {
  const { data } = useReadIdea(id);
  return (
    <>
      {data && (
        <div
          className={cn(styles.IdeaModal, className)}
          data-testid="modal"
          aria-hidden="true"
        >
          <Overlay onClick={hideIdeaForm} />

          <LazyLoad
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IdeaCard idea={data} />
          </LazyLoad>
        </div>
      )}
    </>
  );
};

const IdeaModal = ({ ...props }: IdeaModalProps) =>
  convertPortal(<Template {...props} />);

export default IdeaModal;
