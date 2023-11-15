import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GalleryPage } from '../../util/enums';

export interface PageState {
  currentPage: number;
  pageLimit: number;
  isModalOpen: boolean;
}

const getPageFromURL = (url: string) => {
  const urlParams = new URLSearchParams(url);
  const pageParam = Number(urlParams.get('page'));
  const previousPageParam = window.history.state?.usr?.page;
  return pageParam || previousPageParam || GalleryPage.defaultPage;
};

const getIsModalOpenFromURL = (url: string) => url.includes('modal');

const initialState: PageState = {
  currentPage: getPageFromURL(window.location.search),
  pageLimit: GalleryPage.itemCount,
  isModalOpen: getIsModalOpenFromURL(window.location.pathname),
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return { ...state, currentPage: action.payload };
    },
    setPageLimit: (state, action: PayloadAction<number>) => {
      return { ...state, pageLimit: action.payload };
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, setIsModalOpen: action.payload };
    },
  },
});

export const { setCurrentPage, setPageLimit, setIsModalOpen } =
  pageSlice.actions;

export default pageSlice.reducer;
