import { CommentTab } from '@src/components/common/ButtonTab';
import React from 'react';
import SideLikeButtonContainer from './SideLikeButtonContainer';
import styles from './SideMiddleSection.module.scss';

interface SideMiddleSectionProps {
  sideId: number;
}

const SideMiddleSection = ({ sideId }: SideMiddleSectionProps) => {
  return (
    <section className={styles.SideMiddleSection}>
      <div className={styles.buttonContainer}>
        <SideLikeButtonContainer sideId={sideId} />
        <CommentTab active={true} />
      </div>
    </section>
  );
};

export default SideMiddleSection;
