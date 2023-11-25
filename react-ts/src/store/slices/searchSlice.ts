import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookieStore } from 'next-persist';

export interface SearchState {
  searchValue: string;
}

function initState() {
  return {
    searchValue: '',
  };
}

const initialState: SearchState = initState();
const persistedState = getCookieStore('searchValue', initialState);

export const searchSlice = createSlice({
  name: 'search',
  initialState: persistedState,
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
