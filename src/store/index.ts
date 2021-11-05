import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import uiReducer, { setLoading } from '@src/store/uiSlice';
import sideReducer, { setSide } from '@src/store/sideSlice';

const reducers = combineReducers({
  ui: uiReducer,
  side: sideReducer,
});

const store = configureStore({ reducer: reducers });

export default store;

export { setLoading, setSide };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useUiState = () =>
  useSelector<RootState, RootState['ui']>((state) => state.ui);

export const useSideState = () =>
  useSelector<RootState, RootState['side']>((state) => state.side);
