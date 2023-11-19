import { configureStore } from '@reduxjs/toolkit';
import pageReducer, {
  setCurrentPage,
  setPageLimit,
  setIsModalOpen,
  setIsMainLoading,
  setIsDetailsLoading,
} from '../store/slices/pageSlice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

describe('page reducer', () => {
  let store: ToolkitStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        page: pageReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const actual = store.getState().page;
    expect(actual.currentPage).toEqual(1);
    expect(actual.pageLimit).toEqual(10);
    expect(actual.isModalOpen).toEqual(false);
    expect(actual.isMainLoading).toEqual(false);
    expect(actual.isDetailsLoading).toEqual(false);
  });

  it('should handle setCurrentPage', () => {
    const currentPage = 2;
    store.dispatch(setCurrentPage(currentPage));
    const actual = store.getState().page;
    expect(actual.currentPage).toEqual(currentPage);
  });

  it('should handle setPageLimit', () => {
    const pageLimit = 20;
    store.dispatch(setPageLimit(pageLimit));
    const actual = store.getState().page;
    expect(actual.pageLimit).toEqual(pageLimit);
  });

  it('should handle setIsModalOpen', () => {
    const isModalOpen = true;
    store.dispatch(setIsModalOpen(isModalOpen));
    const actual = store.getState().page;
    expect(actual.isModalOpen).toEqual(isModalOpen);
  });

  it('should handle setIsMainLoading', () => {
    const isMainLoading = true;
    store.dispatch(setIsMainLoading(isMainLoading));
    const actual = store.getState().page;
    expect(actual.isMainLoading).toEqual(isMainLoading);
  });

  it('should handle setIsDetailsLoading', () => {
    const isDetailsLoading = true;
    store.dispatch(setIsDetailsLoading(isDetailsLoading));
    const actual = store.getState().page;
    expect(actual.isDetailsLoading).toEqual(isDetailsLoading);
  });
});
