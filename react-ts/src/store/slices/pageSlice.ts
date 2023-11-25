import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GalleryPage } from '../../util/enums';
import { getCookieStore } from 'next-persist';

export interface PageState {
  currentPage: number;
  pageLimit: number;
  isModalOpen: boolean;
  isMainLoading: boolean;
  isDetailsLoading: boolean;
}

// const getPageFromURL = (url: string) => {
//   const urlParams = new URLSearchParams(url);
//   const pageParam = Number(urlParams.get('page'));
//   const previousPageParam = window.history.state?.usr?.page;
//   return pageParam || previousPageParam || GalleryPage.defaultPage;
// };

// const getIsModalOpenFromURL = (url: string) => url.includes('modal');

const initialState: PageState = {
  currentPage: GalleryPage.defaultPage,
  pageLimit: GalleryPage.itemCount,
  isModalOpen: false,
  isMainLoading: false,
  isDetailsLoading: false,
};
const persistedState = getCookieStore('page', initialState);

export const pageSlice = createSlice({
  name: 'page',
  initialState: persistedState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return { ...state, currentPage: action.payload };
    },
    setPageLimit: (state, action: PayloadAction<number>) => {
      return { ...state, pageLimit: action.payload };
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isModalOpen: action.payload };
    },
    setIsMainLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isMainLoading: action.payload };
    },
    setIsDetailsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isDetailsLoading: action.payload };
    },
  },
});

export const {
  setCurrentPage,
  setPageLimit,
  setIsModalOpen,
  setIsMainLoading,
  setIsDetailsLoading,
} = pageSlice.actions;

export default pageSlice.reducer;
