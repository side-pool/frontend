import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './MyCommentContainer.module.scss';
import IdeaModal from '@src/components/modals/IdeaModal';
import MyCommentCard from '@src/components/Comment/MyCommentCard';
import { MyComment } from '@src/models';
import useModalControl from '@src/hooks/useModalControl';
import Button from '@src/components/common/Button';

const IdeaMiniCardContainer = (props: MyComment) => {
  const history = useHistory();
  const {
    isModalVisible: isIdeaVisible,
    showModal: showIdea,
    hideModal: hideIdea,
  } = useModalControl();

  const hadleClick = () => {
    if (props.type === 'IDEA') {
      return showIdea();
    }

    return history.push(`/side/${props.postId}`);
  };

  return (
    <div className={styles.MyCommentContainer}>
      <Button variant="text" onClick={() => hadleClick()}>
        <MyCommentCard {...props} />
      </Button>
      {isIdeaVisible && props.id && (
        <IdeaModal hideIdeaForm={hideIdea} id={props.id} />
      )}
    </div>
  );
};

export default IdeaMiniCardContainer;
