import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCookieStore } from 'next-persist';

export interface SearchState {
  searchValue: string;
}

const initialState: SearchState = {
  searchValue: '',
};

const persistedState = getCookieStore('searchValue', initialState);

export const searchSlice = createSlice({
  name: 'search',
  initialState: persistedState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return { ...state, searchValue: action.payload };
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
