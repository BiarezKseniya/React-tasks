import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchValue: string;
}

const initialState: SearchState = {
  searchValue: localStorage.getItem('searchValue') || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return { ...state, searchValue: action.payload };
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
