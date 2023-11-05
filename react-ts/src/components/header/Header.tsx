import ErrorButton from '../error-button/ErrorButton';
import Search from '../search/Search';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__text">
        <h1 className="header__title">Pokemon Finder</h1>
        <div className="header__subtitle">Search for your Pokemon!</div>
      </div>
      <div className="header__controls">
        <Search />
        <ErrorButton />
      </div>
    </header>
  );
};

export default Header;
