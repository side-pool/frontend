import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading?: boolean;
  isGlobalAlertVisible?: boolean;
  globalAlertMessage: string;
}

const initialState: UIState = {
  isLoading: false,
  isGlobalAlertVisible: false,
  globalAlertMessage: '',
};

const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, { payload: { isLoading } }: PayloadAction<UIState>) => {
      state.isLoading = isLoading;
    },
    showGlobalAlert: (state, { payload: { globalAlertMessage } }) => {
      state.globalAlertMessage = globalAlertMessage;
      state.isGlobalAlertVisible = true;
    },
    hideGlobalAlert: (state) => {
      state.globalAlertMessage = '';
      state.isGlobalAlertVisible = false;
    },
  },
});

export const { setLoading, showGlobalAlert, hideGlobalAlert } =
  uiReducer.actions;
export default uiReducer.reducer;
