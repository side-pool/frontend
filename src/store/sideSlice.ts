import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SideParams } from '@src/models';
const initialState: SideParams = {
  category: [],
  organization: [],
  skill: [],
  search: [],
  isRecruiting: false,
  page: 0,
  size: 0,
  sort: 'createdDate,asc',
  commentTag: 0,
};

const sideReducer = createSlice({
  name: 'side',
  initialState,
  reducers: {
    setSide: (
      state,
      {
        payload: {
          category,
          isRecruiting,
          organization,
          search,
          skill,
          sort,
          commentTag,
        },
      }: PayloadAction<Partial<SideParams>>,
    ) => {
      if (category !== undefined) state.category = category;
      if (isRecruiting !== undefined) state.isRecruiting = isRecruiting;
      if (organization !== undefined) state.organization = organization;
      if (search !== undefined) state.search = search;
      if (skill !== undefined) state.skill = skill;
      if (sort !== undefined) state.sort = sort;
      if (commentTag !== undefined) state.commentTag = commentTag;
    },
    setInitSide: (state) => {
      state.category = [];
      state.organization = [];
      state.skill = [];
      state.search = [];
      state.isRecruiting = false;
      state.page = 0;
      state.size = 0;
      state.sort = 'createdDate,asc';
      state.commentTag = 0;
    },
  },
});

export const { setSide, setInitSide } = sideReducer.actions;
export default sideReducer.reducer;
