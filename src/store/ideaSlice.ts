import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IdeaParams = {
  search?: string[];
  isDone?: boolean;
  sort?:
    | 'createdDate,asc'
    | 'favoriteCount,asc'
    | 'createdDate,desc'
    | 'favoriteCount,desc';
};

const initialState: IdeaParams = {
  isDone: false,
  search: [],
  sort: 'createdDate,asc',
};

const ideaReducer = createSlice({
  name: 'idea',
  initialState,
  reducers: {
    setIdea: (
      state,
      { payload: { isDone, search, sort } }: PayloadAction<IdeaParams>,
    ) => {
      if (isDone !== undefined) state.isDone = isDone;
      if (search !== undefined) state.search = search;
      if (sort !== undefined) state.sort = sort;
    },
  },
});

export const { setIdea } = ideaReducer.actions;
export default ideaReducer.reducer;
