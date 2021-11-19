import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import uiReducer, {
  setLoading,
  showGlobalAlert,
  hideGlobalAlert,
} from '@src/store/uiSlice';
import sideReducer, { setSide, setInitSide } from '@src/store/sideSlice';
import ideaReducer, { setIdea } from '@src/store/ideaSlice';

const reducers = combineReducers({
  ui: uiReducer,
  side: sideReducer,
  idea: ideaReducer,
});

const store = configureStore({ reducer: reducers });

export default store;

export {
  setLoading,
  showGlobalAlert,
  hideGlobalAlert,
  setSide,
  setInitSide,
  setIdea,
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useUiState = () =>
  useSelector<RootState, RootState['ui']>((state) => state.ui);

export const useSideState = () =>
  useSelector<RootState, RootState['side']>((state) => state.side);

export const useIdeaState = () =>
  useSelector<RootState, RootState['idea']>((state) => state.idea);
