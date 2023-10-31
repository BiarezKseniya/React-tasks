import SearchIcon from '../icons/SearchIcon';
import './Search.css';
import { useState, useCallback } from 'react';

const Search = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('searchValue', searchValue);

      const event = new CustomEvent('searchValueChange', {
        detail: searchValue,
      });
      window.dispatchEvent(event);
    },
    [searchValue]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        value={searchValue}
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
