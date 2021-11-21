import Card from '@src/components/common/Card';
import LabelTag from '@src/components/common/LabelTag';
import Typography from '@src/components/common/Typography';
import { MiniIdea } from '@src/models';
import React from 'react';
import styles from './IdeaMiniCard.module.scss';

const IdeaMiniCard = ({
  title,
  hashtags,
  isDone = false,
  content,
}: MiniIdea) => {
  return (
    <Card className={styles.IdeaMiniCard}>
      <div className={styles.ideaMiniTopArea}>
        <div className={styles.titleContainer}>
          <Typography fontSize="md">{title}</Typography>
        </div>
      </div>
      <div className={styles.ideaMiniBottomArea}>
        <div className={styles.ideaMiniInfoContainer}>
          <Typography fontSize="xs" textColor="blueActive">
            {hashtags.map((each) => '#' + each).join(' ')}
          </Typography>
          {isDone ? (
            <LabelTag textColor="white" wrapperColor="orange">
              해결되었어요
            </LabelTag>
          ) : (
            <LabelTag textColor="orange" wrapperColor="beige">
              제안해요
            </LabelTag>
          )}
        </div>
        <div className={styles.ideaMiniContentContainer}>
          <Typography fontSize="xs">{content}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default IdeaMiniCard;
