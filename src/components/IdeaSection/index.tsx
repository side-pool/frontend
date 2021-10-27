import React from 'react';
import Button from '@src/components/common/Button';
import LabelTag from '@src/components/common/LabelTag';
import Typography from '@src/components/common/Typography';
import Author from '@src/components/common/Author';
import { getDiffTime } from '@src/utils/common';
import { Idea } from '@src/models';
import styles from './IdeaSection.module.scss';

interface IdeaSectionProps {
  idea: Idea;
}

interface IsDoneTagProps {
  isDone: boolean;
}

const IsDoneTag = ({ isDone }: IsDoneTagProps) =>
  isDone ? (
    <LabelTag wrapperColor="orange" textColor="white" className="isDoneTag">
      해결됐어요
    </LabelTag>
  ) : (
    <LabelTag wrapperColor="beige" textColor="orange" className="isDoneTag">
      제안해요
    </LabelTag>
  );

const IdeaSection = ({ idea }: IdeaSectionProps) => {
  return (
    <section className={styles.IdeaSection}>
      <header>
        <Typography fontSize="md" fontWeight="medium">
          {idea.title}
        </Typography>
      </header>
      <IsDoneTag isDone={idea.isDone} />
      <div className={styles.subText}>
        <Author nickname={idea.author.nickname} />
        <Typography
          textColor="gray"
          fontSize="xxs"
          className={styles.writtenDate}
        >
          {getDiffTime({
            newDate: new Date(),
            oldDate: new Date(idea.updatedDate),
          })}
        </Typography>
      </div>
      <Typography fontSize="xs" className={styles.ideaBody}>
        {idea.content}
      </Typography>
      <Button
        // TODO: 본문 길이에 따라 hide
        variant="text"
        labelText="더보기"
        className={styles.moreButton}
      />
      <div className={styles.labelArea}>
        {idea.hashtags.map((tag, index) => (
          <LabelTag key={index}>{`# ${tag}`}</LabelTag>
        ))}
      </div>
    </section>
  );
};

export default IdeaSection;
