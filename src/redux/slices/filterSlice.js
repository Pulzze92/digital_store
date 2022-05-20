import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  page: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.page = Number(action.payload.page);
        state.category = Number(action.payload.category);
        state.sort = action.payload.sort;
      } else {
        state.page = 1;
        state.category = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },
  },
});

export const { setCategory, setSort, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
