import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchValue: string;
}

function initState() {
  return {
    // searchValue: localStorage.getItem('searchValue') || '',
    searchValue: '',
  };
}

const initialState: SearchState = initState();

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return { ...state, searchValue: action.payload };
    },
    resetSearch: () => {
      return initState();
    },
  },
});

export const { setSearchValue, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
