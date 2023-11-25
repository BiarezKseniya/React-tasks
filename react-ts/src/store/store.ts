import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import pageReducer from './slices/pageSlice';
import { apiSlice } from './slices/apiSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    page: pageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const wrapper = createWrapper(() => store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;

export default wrapper;
