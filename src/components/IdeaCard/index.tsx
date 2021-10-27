import React, { useState } from 'react';
import Card from '@src/components/common/Card';
import IdeaSection from '@src/components/IdeaSection';
import { Idea } from '@src/models';
import LikeButton from '@src/components/common/LikeButton';
import styles from './IdeaCard.module.scss';
import {
  CommentTab,
  SimilarServiceTab,
} from '@src/components/common/ButtonTab';
import { UserTab } from '@src/constant/enums';

export interface IdeaCardProps {
  idea: Idea;
}

const IdeaCard = ({ idea }: IdeaCardProps) => {
  const [tabToggle, setTabToggle] = useState(UserTab.COMMENT);

  return (
    <Card className={styles.IdeaCard}>
      <IdeaSection idea={idea} />
      <section>
        <div className="buttonContainer">
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
    </Card>
  );
};

export default IdeaCard;
