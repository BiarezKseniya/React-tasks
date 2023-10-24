import Search from '../search/Search';
import './Header.css';
import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__text">
          <h1 className="header__title">Pokemon Finder</h1>
          <div className="header__subtitle">Search for your Pokemon!</div>
        </div>
        <Search />
      </header>
    );
  }
}

export default Header;
