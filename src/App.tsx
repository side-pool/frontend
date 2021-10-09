import React from 'react';
import { setLoading, useAppDispatch, useUiState } from '@src/store';
import cn from 'classnames';
import './App.scss';

const HIGHLIGHT = 'highlight';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useUiState();

  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch(setLoading({ isLoading: !isLoading }))}
      >
        toggle
      </button>
      <div>
        {isLoading ? <p>loading</p> : <p className={cn(HIGHLIGHT)}>break</p>}
      </div>
    </div>
  );
};

export default App;
