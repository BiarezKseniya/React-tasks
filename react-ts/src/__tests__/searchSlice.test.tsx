import { configureStore } from '@reduxjs/toolkit';
import searchReducer, {
  setSearchValue,
  resetSearch,
} from '../store/slices/searchSlice';
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

  afterEach(() => {
    store.dispatch(resetSearch());
  });

  test('should handle initial state without localStorage value', () => {
    Storage.prototype.getItem = vi.fn(() => null);
    store.dispatch(resetSearch());
    const actual = store.getState().search;
    expect(actual.searchValue).toEqual('');
  });

  test('should handle initial state with localStorage value', () => {
    const testValue = 'test value';
    Storage.prototype.getItem = vi.fn(() => testValue);
    store.dispatch(resetSearch());
    const actual = store.getState().search;
    expect(actual.searchValue).toEqual(testValue);
  });

  test('should handle setSearchValue', () => {
    const searchValue = 'test';
    store.dispatch(setSearchValue(searchValue));
    const actual = store.getState().search;
    expect(actual.searchValue).toEqual(searchValue);
  });
});
