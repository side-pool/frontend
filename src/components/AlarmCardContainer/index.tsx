import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDeleteAlarm, useTurnToReadAlarm } from '@src/hooks/useMyPageQuery';
import AlarmCard from '@src/components/AlarmCard';
import useModalControl from '@src/hooks/useModalControl';
import IdeaModal from '@src/components/modals/IdeaModal';
import { Alarm } from '@src/models';

const AlarmCardContainer = (props: Alarm) => {
  const {
    isModalVisible: isIdeaVisible,
    showModal: showIdea,
    hideModal: hideIdea,
  } = useModalControl();

  const history = useHistory();

  const deleteAlarmMutation = useDeleteAlarm();
  const turnToReadAlarmMutation = useTurnToReadAlarm();

  const handleClick = () => {
    turnToReadAlarmMutation.mutate(props.id, {
      onSuccess: () => {
        if (props.postType === '사이드') {
          return history.push(`/side/${props.postId}`);
        }
        return showIdea();
      },
    });
  };
  return (
    <div>
      <AlarmCard
        onClick={handleClick}
        onClose={() => deleteAlarmMutation.mutate(props.id)}
        {...props}
      />
      {isIdeaVisible && props.id && (
        <IdeaModal hideIdeaForm={hideIdea} id={props.postId} />
      )}
    </div>
  );
};

export default AlarmCardContainer;
