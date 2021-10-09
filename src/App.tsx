import React from 'react';
import { setLoading, useAppDispatch, useUiState } from '@src/store';

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
      <div>{isLoading ? 'loading' : 'break'}</div>
    </div>
  );
};

export default App;
