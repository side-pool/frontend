import React from 'react';
import { setLoading, useAppDispatch, useUiState } from '@src/store';
import cn from 'classnames';
import { CardWithContent } from '@src/components/common/Card/Card.stories';
import { LabelTags } from '@src/components/common/LabelTag/LabelTag.stories';

import styles from '@src/pages/LandingPage/LandingPage.module.scss';

const HIGHLIGHT = 'highlight';

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useUiState();

  return (
    <div className={styles.LandingPage}>
      <button
        type="button"
        onClick={() => dispatch(setLoading({ isLoading: !isLoading }))}
      >
        toggle
      </button>
      <div>
        {isLoading ? <p>loading</p> : <p className={cn(HIGHLIGHT)}>break</p>}
      </div>
      <CardWithContent />
      <LabelTags />
    </div>
  );
};

export default LandingPage;
