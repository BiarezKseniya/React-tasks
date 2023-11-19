import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '../icons/SearchIcon';
import './Search.css';
import { useState, useCallback } from 'react';
import { RootState } from '../../store/store';
import { setSearchValue } from '../../store/slices/searchSlice';

const Search = () => {
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('searchValue', localSearchValue);
      dispatch(setSearchValue(localSearchValue));
    },
    [dispatch, localSearchValue]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchValue(e.target.value);
    },
    []
  );

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        value={localSearchValue}
        className="search__input"
        type="text"
        placeholder="Pokemon name or pokedex number..."
        onChange={handleInputChange}
      />
      <SearchIcon onClick={handleSubmit} />
    </form>
  );
};

export default Search;
