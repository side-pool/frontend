import React, { useState } from 'react';
import Card from '@src/components/common/Card';
import { Idea } from '@src/models';
import IdeaMainSection from '@src/components/Idea/IdeaMainSection';
import { UserTab } from '@src/constant/enums';
import IdeaCommentForm from '@src/components/Idea/IdeaComment/IdeaCommentForm';
import IdeaCommentBox from '@src/components/Idea/IdeaComment/IdeaCommentBox';
import LikeButton from '@src/components/common/LikeButton';
import {
  CommentTab,
  SimilarServiceTab,
} from '@src/components/common/ButtonTab';
import styles from './IdeaCard.module.scss';

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
      <section className={styles.ideaCommentSection}>
        <IdeaCommentForm ideaId={idea.id} />
        <IdeaCommentBox ideaId={idea.id} />
      </section>
    </Card>
  );
};

export default IdeaCard;
