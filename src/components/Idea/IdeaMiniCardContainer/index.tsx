import IdeaModal from '@src/components/modals/IdeaModal';
import React from 'react';
import IdeaMiniCard from '@src/components/Idea/IdeaMiniCard';
import { MiniIdea } from '@src/models';
import useModalControl from '@src/hooks/useModalControl';
import Button from '@src/components/common/Button';
import styles from './IdeaMiniCardContainer.module.scss';

const IdeaMiniCardContainer = (props: MiniIdea) => {
  const {
    isModalVisible: isIdeaVisible,
    showModal: showIdea,
    hideModal: hideIdea,
  } = useModalControl();

  return (
    <div className={styles.IdeaMiniCardContainer}>
      <Button variant="text" onClick={() => showIdea()} fullWidth>
        <IdeaMiniCard {...props} />
      </Button>
      {isIdeaVisible && props.id && (
        <IdeaModal hideIdeaForm={hideIdea} id={props.id} />
      )}
    </div>
  );
};

export default IdeaMiniCardContainer;
