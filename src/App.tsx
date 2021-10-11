import React from 'react';
import { setLoading, useAppDispatch, useUiState } from '@src/store';
import cn from 'classnames';
import './main.scss';
import styles from './App.module.scss';
import { CardWithContent } from './components/common/Card/Card.stories';
import { LabelTags } from './components/common/LabelTag/LabelTag.stories';

const HIGHLIGHT = 'highlight';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useUiState();

  return (
    <div>
      <button
        className={styles.test}
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

export default App;
