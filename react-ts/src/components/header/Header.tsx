// import ErrorButton from '../error-button/ErrorButton';
// import Search from '../search/Search';
import styles from '@/components/header/Header.module.css';
import Search from '@/components/search/Search';

const Header = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['header__text']}>
        <h1 className={styles['header__title']}>Pokemon Finder</h1>
        <div className={styles['header__subtitle']}>
          Search for your Pokemon!
        </div>
      </div>
      <div className={styles['header__controls']}>
        <Search />
        {/* <ErrorButton /> */}
      </div>
    </header>
  );
};

export default Header;
