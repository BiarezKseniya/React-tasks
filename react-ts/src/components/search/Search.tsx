import { Actions } from '../../util/enums';
import { AppContext } from '../context/AppState';
import SearchIcon from '../icons/SearchIcon';
import './Search.css';
import { useState, useCallback, useContext } from 'react';

const Search = () => {
  const { state, dispatch } = useContext(AppContext);
  const { searchValue } = state;
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('searchValue', localSearchValue);
      dispatch({ type: Actions.setSearchValue, value: localSearchValue });
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
