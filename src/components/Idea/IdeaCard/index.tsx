import React, { useState } from 'react';
import Card from '@src/components/common/Card';
import { Idea } from '@src/models';
import IdeaMainSection from '@src/components/Idea/IdeaMainSection';
import { UserTab } from '@src/constant/enums';
import LikeButton from '@src/components/common/LikeButton';
import {
  CommentTab,
  SimilarServiceTab,
} from '@src/components/common/ButtonTab';
import styles from './IdeaCard.module.scss';
import IdeaBottomSection from '../IdeaBottomSection/indet';

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
          <LikeButton
            count={idea.favoriteCount}
            active={idea.isFavorite ?? false}
            onClick={() => {
              // TODO: API 연결
            }}
          />
          <CommentTab
            active={tabToggle === UserTab.COMMENT}
            onClick={() => {
              setTabToggle(UserTab.COMMENT);
              // TODO: API 연결
            }}
          />
          <SimilarServiceTab
            active={tabToggle === UserTab.SIMILAR_SERVICE}
            onClick={() => {
              setTabToggle(UserTab.SIMILAR_SERVICE);
              // TODO: API 연결
            }}
          />
        </div>
      </section>
      <IdeaBottomSection tabToggle={tabToggle} ideaId={idea.id} />
    </Card>
  );
};

export default IdeaCard;
