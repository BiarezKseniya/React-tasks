import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { setSearchValue } from '../store/slices/searchSlice';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

describe('Search reducer', () => {
  let store: ToolkitStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchReducer,
      },
    });
  });

  test('should handle initial state', () => {
    Storage.prototype.getItem = vi.fn(() => null);
    const actual = store.getState().search;
    expect(actual.searchValue).toEqual('');
  });

  test('should handle setSearchValue', () => {
    const searchValue = 'test';
    store.dispatch(setSearchValue(searchValue));
    const actual = store.getState().search;
    expect(actual.searchValue).toEqual(searchValue);
  });
});
