import React from 'react';
import styles from './IdeaPage.module.scss';
import Button from '@src/components/common/Button';

const IdeaPage = () => {
  return (
    <div className={styles.IdeaPage}>
      <Button
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
      />
      <Button
        className={styles.createSideButton}
        variant="floating"
        iconName="add"
      />
    </div>
  );
};

export default IdeaPage;
