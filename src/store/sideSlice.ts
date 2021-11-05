import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidePrams } from '@src/models';

const initialState: SidePrams = {
  category: [],
  organization: [],
  skill: [],
  isRecruiting: false,
  page: 0,
  size: 0,
};

const sideReducer = createSlice({
  name: 'side',
  initialState,
  reducers: {
    setSide: (
      state,
      {
        payload: { category, isRecruiting, organization, search, skill },
      }: PayloadAction<SidePrams>,
    ) => {
      if (category !== undefined) state.category = category;
      if (isRecruiting !== undefined) state.isRecruiting = isRecruiting;
      if (organization !== undefined) state.organization = organization;
      if (search !== undefined) state.search = search;
      if (skill !== undefined) state.skill = skill;
    },
  },
});

export const { setSide } = sideReducer.actions;
export default sideReducer.reducer;
