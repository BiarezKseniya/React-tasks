import { useSearch } from '../context/SearchContext';
import SearchIcon from '../icons/SearchIcon';
import './Search.css';
import { useState, useCallback } from 'react';

const Search = () => {
  const { searchValue, setSearchValue } = useSearch();
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('searchValue', localSearchValue);
      setSearchValue(localSearchValue);
    },
    [localSearchValue, setSearchValue]
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
