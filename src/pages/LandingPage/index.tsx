import React from 'react';
import { setLoading, useAppDispatch, useUiState } from '@src/store';
import cn from 'classnames';
import { CardWithContent } from '@src/components/common/Card/Card.stories';
import { LabelTags } from '@src/components/common/LabelTag/LabelTag.stories';

import styles from '@src/pages/LandingPage/LandingPage.module.scss';
import SideCard from '@src/components/SideCard';

const HIGHLIGHT = 'highlight';

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useUiState();

  return (
    <div className={styles.LandingPage}>
      <SideCard
        active="2021-10-29T01:18:23"
        category={['AI', 'WEB', 'APP', 'AI', 'WEB', 'APP', 'AI', 'WEB', 'APP']}
        recruiting
        summary="작은 사이드 프로젝트에서 시작하는 ~~~"
        title="작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~작은 사이드 프로젝트에서 시작하는 ~~~"
      />

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
