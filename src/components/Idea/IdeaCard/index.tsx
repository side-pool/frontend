import React, { useState } from 'react';
import styles from './IdeaCard.module.scss';
import Card from '@src/components/common/Card';
import { Idea } from '@src/models';
import IdeaMainSection from '@src/components/Idea/IdeaMainSection';
import { UserTab } from '@src/constant/enums';
import {
  CommentTab,
  SimilarServiceTab,
} from '@src/components/common/ButtonTab';
import IdeaBottomSection from '@src/components/Idea/IdeaBottomSection';
import LikeButtonContainer from '../LikeButtonContainer';

export interface IdeaCardProps {
  idea: Idea;
}

const IdeaCard = ({ idea }: IdeaCardProps) => {
  const [tabToggle, setTabToggle] = useState(UserTab.COMMENT);

  return (
    <Card className={styles.IdeaCard}>
      <IdeaMainSection idea={idea} />
      <section className={styles.middleArea}>
        <div className={styles.buttonContainer}>
          <LikeButtonContainer ideaId={idea.id} />
          <CommentTab
            active={tabToggle === UserTab.COMMENT}
            onClick={() => {
              setTabToggle(UserTab.COMMENT);
            }}
          />
          <SimilarServiceTab
            active={tabToggle === UserTab.SIMILAR_SERVICE}
            onClick={() => {
              setTabToggle(UserTab.SIMILAR_SERVICE);
            }}
          />
        </div>
      </section>
      <IdeaBottomSection tabToggle={tabToggle} ideaId={idea.id} />
    </Card>
  );
};

export default IdeaCard;
