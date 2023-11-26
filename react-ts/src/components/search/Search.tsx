import styles from '@/components/search/Search.module.css';
import { setSearchValue } from '@/store/slices/searchSlice';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@/components/icons/SearchIcon';
import { setCookieStore } from 'next-persist';
import { useRouter } from 'next/router';

const Search = ({ searchValue }: { searchValue: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      localStorage.setItem('searchValue', localSearchValue);
      dispatch(setSearchValue(localSearchValue));
      setCookieStore(
        { searchValue: ['searchValue'] },
        { searchValue: localSearchValue }
      );
      router.replace(`/page/1`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, localSearchValue]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchValue(e.target.value);
    },
    []
  );

  return (
    <form className={styles['search']} onSubmit={handleSubmit}>
      <input
        value={localSearchValue}
        className={styles['search__input']}
        type="text"
        placeholder="Pokemon name or pokedex number..."
        onChange={handleInputChange}
      />
      <SearchIcon onClick={handleSubmit} />
    </form>
  );
};

export default Search;
