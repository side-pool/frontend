import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidePrams } from '@src/models';

const initialState: SidePrams = {
  category: [],
  organization: [],
  skill: [],
  search: [],
  isRecruiting: false,
  page: 0,
  size: 0,
  sort: 'asc',
};

const sideReducer = createSlice({
  name: 'side',
  initialState,
  reducers: {
    setSide: (
      state,
      {
        payload: { category, isRecruiting, organization, search, skill, sort },
      }: PayloadAction<SidePrams>,
    ) => {
      if (category !== undefined) state.category = category;
      if (isRecruiting !== undefined) state.isRecruiting = isRecruiting;
      if (organization !== undefined) state.organization = organization;
      if (search !== undefined) state.search = search;
      if (skill !== undefined) state.skill = skill;
      if (sort !== undefined) state.sort = sort;
    },
  },
});

export const { setSide } = sideReducer.actions;
export default sideReducer.reducer;
