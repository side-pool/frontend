import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading?: boolean;
}

const initialState: UIState = {
  isLoading: false,
};

const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, { payload: { isLoading } }: PayloadAction<UIState>) => {
      state.isLoading = isLoading;
    },
  },
});

export const { setLoading } = uiReducer.actions;
export default uiReducer.reducer;
