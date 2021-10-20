import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading?: boolean;
  alertModalIsVisible?: boolean;
  alertModalTitle?: string;
  alertModalContent?: string;
}

const initialState: UIState = {
  isLoading: false,
  alertModalIsVisible: false,
  alertModalTitle: '알림',
  alertModalContent: '',
};

const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, { payload: { isLoading } }: PayloadAction<UIState>) => {
      state.isLoading = isLoading;
    },
    showAlertModal: (
      state,
      {
        payload: { alertModalContent, alertModalTitle },
      }: PayloadAction<UIState>,
    ) => {
      state.alertModalIsVisible = true;
      if (alertModalTitle) {
        state.alertModalTitle = alertModalTitle;
      }
      state.alertModalContent = alertModalContent;
    },
    hideAlertModal: (state) => {
      state.alertModalIsVisible = false;
    },
  },
});

export const { setLoading, showAlertModal, hideAlertModal } = uiReducer.actions;
export default uiReducer.reducer;
